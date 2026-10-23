-- ═══════════════════════════════════════════════════════════════
--  r4dzioo — Supabase setup SQL
--  Wklej to w całości do: Supabase → SQL Editor → New query → Run
-- ═══════════════════════════════════════════════════════════════


-- ─── 1. STATS (licznik odwiedzin) ───────────────────────────────
CREATE TABLE IF NOT EXISTS stats (
  key   TEXT PRIMARY KEY,
  value BIGINT NOT NULL DEFAULT 0
);

-- Wstaw rekord jeśli nie istnieje
INSERT INTO stats (key, value)
VALUES ('profile-views', 0)
ON CONFLICT (key) DO NOTHING;

-- RLS: anon może czytać
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon read stats" ON stats;
CREATE POLICY "anon read stats"
  ON stats FOR SELECT
  TO anon
  USING (true);


-- ─── 2. RPC: increment_views ────────────────────────────────────
DROP FUNCTION IF EXISTS increment_views(TEXT);
CREATE OR REPLACE FUNCTION increment_views(row_key TEXT)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_val BIGINT;
BEGIN
  INSERT INTO stats (key, value)
  VALUES (row_key, 1)
  ON CONFLICT (key) DO UPDATE
    SET value = stats.value + 1
  RETURNING value INTO new_val;
  RETURN new_val;
END;
$$;

-- Upewnij się że anon może wywołać funkcję
GRANT EXECUTE ON FUNCTION increment_views(TEXT) TO anon;


-- ─── 3. CHANGELOG ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS changelog (
  id          BIGSERIAL PRIMARY KEY,
  date        DATE        NOT NULL,
  project     TEXT        NOT NULL,
  type        TEXT        NOT NULL DEFAULT 'feat',
  title       TEXT        NOT NULL,
  description TEXT,
  bullets     JSONB       DEFAULT '[]'::jsonb,
  created_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE changelog ENABLE ROW LEVEL SECURITY;

-- anon czyta
DROP POLICY IF EXISTS "anon read changelog" ON changelog;
CREATE POLICY "anon read changelog"
  ON changelog FOR SELECT
  TO anon
  USING (true);

-- authenticated (admin) może wszystko
DROP POLICY IF EXISTS "auth full changelog" ON changelog;
CREATE POLICY "auth full changelog"
  ON changelog FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);


-- ─── 4. STATUS_TASKS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS status_tasks (
  id          BIGSERIAL PRIMARY KEY,
  project     TEXT    NOT NULL,
  title       TEXT    NOT NULL,
  done        BOOLEAN NOT NULL DEFAULT false,
  in_progress BOOLEAN NOT NULL DEFAULT false,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE status_tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon read status_tasks" ON status_tasks;
CREATE POLICY "anon read status_tasks"
  ON status_tasks FOR SELECT
  TO anon
  USING (true);

DROP POLICY IF EXISTS "auth full status_tasks" ON status_tasks;
CREATE POLICY "auth full status_tasks"
  ON status_tasks FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);


-- ─── 5. ROADMAP ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS roadmap (
  id          BIGSERIAL PRIMARY KEY,
  project     TEXT NOT NULL,
  title       TEXT NOT NULL,
  stage       TEXT NOT NULL DEFAULT 'planned',  -- 'planned' | 'doing' | 'done'
  description TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE roadmap ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon read roadmap" ON roadmap;
CREATE POLICY "anon read roadmap"
  ON roadmap FOR SELECT
  TO anon
  USING (true);

DROP POLICY IF EXISTS "auth full roadmap" ON roadmap;
CREATE POLICY "auth full roadmap"
  ON roadmap FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);


-- ─── 6. SHOWCASE ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS showcase (
  id          BIGSERIAL PRIMARY KEY,
  project     TEXT        NOT NULL,
  title       TEXT        NOT NULL,
  description TEXT,
  image_url   TEXT,
  tags        JSONB       DEFAULT '[]'::jsonb,
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE showcase ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon read showcase" ON showcase;
CREATE POLICY "anon read showcase"
  ON showcase FOR SELECT
  TO anon
  USING (true);

DROP POLICY IF EXISTS "auth full showcase" ON showcase;
CREATE POLICY "auth full showcase"
  ON showcase FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);


-- ─── 7. Przykładowe dane (opcjonalne, usuń jeśli nie chcesz) ────

INSERT INTO changelog (date, project, type, title, description, bullets) VALUES
  ('2024-10-01', 'PMS',                   'feat', 'System patroli v2',       'Przepisany od zera system zarządzania patrolami.', '["Nowy UI dispatch board","Logi akcji w czasie rzeczywistym"]'),
  ('2024-09-15', 'Project: Czech Republic','feat', 'Szkielet mapy Pragi',     'Zablokowany obszar centrum — Old Town Square i okolice.', '[]'),
  ('2024-08-20', 'Project: Czech Republic','init', 'Inicjalizacja projektu',  'Pierwsze commity, ustawienia Roblox Studio.', '[]')
ON CONFLICT DO NOTHING;

INSERT INTO status_tasks (project, title, done, in_progress, sort_order) VALUES
  ('PMS',                    'Dispatch board',        true,  false, 1),
  ('PMS',                    'Import pojazdów v2',    false, true,  2),
  ('PMS',                    'System kolei',          false, false, 3),
  ('Project: Czech Republic','Terrain — blok centrum',true,  false, 1),
  ('Project: Czech Republic','Autostrada D1',         false, true,  2),
  ('Project: Czech Republic','Budynki śródmieście',   false, false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO roadmap (project, title, stage, description, sort_order) VALUES
  ('PMS',                    'Alpha release',      'done',    'Podstawowy gameplay, dispatch, pojazdy.',              1),
  ('PMS',                    'Beta — polish',      'doing',   'Balancing, bugfixy, nowe pojazdy.',                   2),
  ('PMS',                    'v1.0 public',        'planned', 'Pełne wdrożenie na serwer publiczny.',                3),
  ('Project: Czech Republic','Terrain pass',       'doing',   'Modelowanie terenu, główne drogi.',                   1),
  ('Project: Czech Republic','City buildings',     'planned', 'Obiekty i budynki w centrum Pragi.',                  2),
  ('Project: Czech Republic','Open beta',          'planned', 'Pierwsza publiczna wersja mapy.',                     3)
ON CONFLICT DO NOTHING;

INSERT INTO showcase (project, title, description, image_url, tags, sort_order) VALUES
  ('Project: Czech Republic', 'Prague overview',    'Aerial view of the blocked-out city centre. Old Town Square area.', null, '["Czech Republic","terrain"]', 1),
  ('Project: Czech Republic', 'D1 motorway',        'First segment of the D1 corridor. Road mesh and basic surface materials in place.', null, '["Czech Republic","roads"]', 2),
  ('PMS',                     'Dispatch board',     'Live unit tracking interface. Shows active, dispatched and unavailable units.', null, '["PMS","UI"]', 3)
ON CONFLICT DO NOTHING;
