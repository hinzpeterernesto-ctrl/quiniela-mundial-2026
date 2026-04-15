import { useState, useEffect, useCallback } from "react";

// ─── Storage helper (localStorage) ───
const storage = {
  get(key) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  },
};

// ─── Match Data ───
const MATCHES_BY_DATE = {
  "11 Jun": [
    { id: "A1", group: "A", home: "México", away: "Sudáfrica", date: "11 Jun" },
    { id: "A2", group: "A", home: "Corea del Sur", away: "Rep. Checa", date: "11 Jun" },
  ],
  "12 Jun": [
    { id: "B1", group: "B", home: "Canadá", away: "Bosnia y Herz.", date: "12 Jun" },
    { id: "D1", group: "D", home: "EE.UU.", away: "Paraguay", date: "12 Jun" },
    { id: "C1", group: "C", home: "Brasil", away: "Marruecos", date: "12 Jun" },
  ],
  "13 Jun": [
    { id: "B2", group: "B", home: "Catar", away: "Suiza", date: "13 Jun" },
    { id: "D2", group: "D", home: "Australia", away: "Turquía", date: "13 Jun" },
    { id: "C2", group: "C", home: "Haití", away: "Escocia", date: "13 Jun" },
  ],
  "14 Jun": [
    { id: "E1", group: "E", home: "Alemania", away: "Curazao", date: "14 Jun" },
    { id: "E2", group: "E", home: "Costa de Marfil", away: "Ecuador", date: "14 Jun" },
    { id: "F1", group: "F", home: "Países Bajos", away: "Japón", date: "14 Jun" },
    { id: "F2", group: "F", home: "Suecia", away: "Túnez", date: "14 Jun" },
  ],
  "15 Jun": [
    { id: "G1", group: "G", home: "Bélgica", away: "Egipto", date: "15 Jun" },
    { id: "G2", group: "G", home: "Irán", away: "Nueva Zelanda", date: "15 Jun" },
    { id: "H1", group: "H", home: "España", away: "Cabo Verde", date: "15 Jun" },
    { id: "H2", group: "H", home: "Arabia Saudita", away: "Uruguay", date: "15 Jun" },
  ],
  "16 Jun": [
    { id: "I1", group: "I", home: "Francia", away: "Senegal", date: "16 Jun" },
    { id: "I2", group: "I", home: "Noruega", away: "Irak", date: "16 Jun" },
    { id: "J1", group: "J", home: "Argentina", away: "Argelia", date: "16 Jun" },
    { id: "J2", group: "J", home: "Austria", away: "Jordania", date: "16 Jun" },
  ],
  "17 Jun": [
    { id: "K1", group: "K", home: "Portugal", away: "RD del Congo", date: "17 Jun" },
    { id: "K2", group: "K", home: "Uzbekistán", away: "Colombia", date: "17 Jun" },
    { id: "L1", group: "L", home: "Inglaterra", away: "Croacia", date: "17 Jun" },
    { id: "L2", group: "L", home: "Ghana", away: "Panamá", date: "17 Jun" },
  ],
  "18 Jun": [
    { id: "A3", group: "A", home: "Rep. Checa", away: "Sudáfrica", date: "18 Jun" },
    { id: "A4", group: "A", home: "México", away: "Corea del Sur", date: "18 Jun" },
  ],
  "19 Jun": [
    { id: "D3", group: "D", home: "Turquía", away: "Paraguay", date: "19 Jun" },
    { id: "D4", group: "D", home: "EE.UU.", away: "Australia", date: "19 Jun" },
    { id: "B3", group: "B", home: "Bosnia y Herz.", away: "Catar", date: "19 Jun" },
    { id: "B4", group: "B", home: "Canadá", away: "Suiza", date: "19 Jun" },
  ],
  "20 Jun": [
    { id: "C3", group: "C", home: "Marruecos", away: "Haití", date: "20 Jun" },
    { id: "C4", group: "C", home: "Brasil", away: "Escocia", date: "20 Jun" },
    { id: "E3", group: "E", home: "Alemania", away: "Costa de Marfil", date: "20 Jun" },
    { id: "E4", group: "E", home: "Ecuador", away: "Curazao", date: "20 Jun" },
  ],
  "21 Jun": [
    { id: "F3", group: "F", home: "Países Bajos", away: "Suecia", date: "21 Jun" },
    { id: "F4", group: "F", home: "Japón", away: "Túnez", date: "21 Jun" },
    { id: "G3", group: "G", home: "Bélgica", away: "Irán", date: "21 Jun" },
    { id: "G4", group: "G", home: "Nueva Zelanda", away: "Egipto", date: "21 Jun" },
  ],
  "22 Jun": [
    { id: "H3", group: "H", home: "Uruguay", away: "Cabo Verde", date: "22 Jun" },
    { id: "H4", group: "H", home: "España", away: "Arabia Saudita", date: "22 Jun" },
    { id: "J3", group: "J", home: "Argentina", away: "Austria", date: "22 Jun" },
    { id: "J4", group: "J", home: "Jordania", away: "Argelia", date: "22 Jun" },
  ],
  "23 Jun": [
    { id: "I3", group: "I", home: "Francia", away: "Noruega", date: "23 Jun" },
    { id: "I4", group: "I", home: "Irak", away: "Senegal", date: "23 Jun" },
    { id: "K3", group: "K", home: "Portugal", away: "Uzbekistán", date: "23 Jun" },
    { id: "K4", group: "K", home: "RD del Congo", away: "Colombia", date: "23 Jun" },
    { id: "L3", group: "L", home: "Inglaterra", away: "Ghana", date: "23 Jun" },
    { id: "L4", group: "L", home: "Panamá", away: "Croacia", date: "23 Jun" },
  ],
  "24 Jun": [
    { id: "A5", group: "A", home: "Rep. Checa", away: "México", date: "24 Jun" },
    { id: "A6", group: "A", home: "Sudáfrica", away: "Corea del Sur", date: "24 Jun" },
  ],
  "25 Jun": [
    { id: "D5", group: "D", home: "Turquía", away: "EE.UU.", date: "25 Jun" },
    { id: "D6", group: "D", home: "Paraguay", away: "Australia", date: "25 Jun" },
    { id: "E5", group: "E", home: "Ecuador", away: "Alemania", date: "25 Jun" },
    { id: "E6", group: "E", home: "Curazao", away: "Costa de Marfil", date: "25 Jun" },
    { id: "F5", group: "F", home: "Túnez", away: "Países Bajos", date: "25 Jun" },
    { id: "F6", group: "F", home: "Suecia", away: "Japón", date: "25 Jun" },
  ],
  "26 Jun": [
    { id: "B5", group: "B", home: "Suiza", away: "Canadá", date: "26 Jun" },
    { id: "B6", group: "B", home: "Bosnia y Herz.", away: "Catar", date: "26 Jun" },
    { id: "G5", group: "G", home: "Egipto", away: "Irán", date: "26 Jun" },
    { id: "G6", group: "G", home: "Nueva Zelanda", away: "Bélgica", date: "26 Jun" },
    { id: "H5", group: "H", home: "Cabo Verde", away: "Arabia Saudita", date: "26 Jun" },
    { id: "H6", group: "H", home: "Uruguay", away: "España", date: "26 Jun" },
  ],
  "27 Jun": [
    { id: "I5", group: "I", home: "Irak", away: "Francia", date: "27 Jun" },
    { id: "I6", group: "I", home: "Senegal", away: "Noruega", date: "27 Jun" },
    { id: "J5", group: "J", home: "Argelia", away: "Austria", date: "27 Jun" },
    { id: "J6", group: "J", home: "Jordania", away: "Argentina", date: "27 Jun" },
    { id: "K5", group: "K", home: "Colombia", away: "Portugal", date: "27 Jun" },
    { id: "K6", group: "K", home: "RD del Congo", away: "Uzbekistán", date: "27 Jun" },
    { id: "L5", group: "L", home: "Panamá", away: "Inglaterra", date: "27 Jun" },
    { id: "L6", group: "L", home: "Croacia", away: "Ghana", date: "27 Jun" },
  ],
};

const ALL_DATES = Object.keys(MATCHES_BY_DATE);
const ALL_MATCHES = Object.values(MATCHES_BY_DATE).flat();

const GROUP_COLORS = {
  A: "#e74c3c", B: "#e67e22", C: "#f1c40f", D: "#2ecc71",
  E: "#1abc9c", F: "#3498db", G: "#9b59b6", H: "#e91e63",
  I: "#00bcd4", J: "#8bc34a", K: "#ff9800", L: "#607d8b",
};

const FLAGS = {
  "México": "🇲🇽", "Sudáfrica": "🇿🇦", "Corea del Sur": "🇰🇷", "Rep. Checa": "🇨🇿",
  "Canadá": "🇨🇦", "Bosnia y Herz.": "🇧🇦", "Catar": "🇶🇦", "Suiza": "🇨🇭",
  "Brasil": "🇧🇷", "Marruecos": "🇲🇦", "Haití": "🇭🇹", "Escocia": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  "EE.UU.": "🇺🇸", "Paraguay": "🇵🇾", "Australia": "🇦🇺", "Turquía": "🇹🇷",
  "Alemania": "🇩🇪", "Curazao": "🇨🇼", "Costa de Marfil": "🇨🇮", "Ecuador": "🇪🇨",
  "Países Bajos": "🇳🇱", "Japón": "🇯🇵", "Suecia": "🇸🇪", "Túnez": "🇹🇳",
  "Bélgica": "🇧🇪", "Egipto": "🇪🇬", "Irán": "🇮🇷", "Nueva Zelanda": "🇳🇿",
  "España": "🇪🇸", "Cabo Verde": "🇨🇻", "Arabia Saudita": "🇸🇦", "Uruguay": "🇺🇾",
  "Francia": "🇫🇷", "Senegal": "🇸🇳", "Noruega": "🇳🇴", "Irak": "🇮🇶",
  "Argentina": "🇦🇷", "Argelia": "🇩🇿", "Austria": "🇦🇹", "Jordania": "🇯🇴",
  "Portugal": "🇵🇹", "Uzbekistán": "🇺🇿", "Colombia": "🇨🇴", "RD del Congo": "🇨🇩",
  "Inglaterra": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "Croacia": "🇭🇷", "Ghana": "🇬🇭", "Panamá": "🇵🇦",
};

const PTS_EXACT = 5;
const PTS_RESULT = 3;
const PTS_GOALS = 1;

function calcPoints(pred, actual) {
  if (!actual || actual.home === "" || actual.away === "") return null;
  const pH = parseInt(pred.home), pA = parseInt(pred.away);
  const aH = parseInt(actual.home), aA = parseInt(actual.away);
  if (isNaN(pH) || isNaN(pA) || isNaN(aH) || isNaN(aA)) return null;
  if (pH === aH && pA === aA) return PTS_EXACT;
  let pts = 0;
  if (Math.sign(pH - pA) === Math.sign(aH - aA)) pts += PTS_RESULT;
  if (pH === aH || pA === aA) pts += PTS_GOALS;
  return pts;
}

export default function App() {
  const [players, setPlayers] = useState(() => storage.get("q_players") || []);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [predictions, setPredictions] = useState({});
  const [results, setResults] = useState(() => storage.get("q_results") || {});
  const [selectedDate, setSelectedDate] = useState(ALL_DATES[0]);
  const [view, setView] = useState("home");
  const [newPlayerName, setNewPlayerName] = useState("");
  const [toast, setToast] = useState(null);
  const [standingsData, setStandingsData] = useState([]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const addPlayer = () => {
    const name = newPlayerName.trim();
    if (!name || players.includes(name)) return;
    const updated = [...players, name];
    setPlayers(updated);
    storage.set("q_players", updated);
    setNewPlayerName("");
    showToast(`${name} se unió a la quiniela`);
  };

  const removePlayer = (name) => {
    if (!confirm(`¿Eliminar a ${name} de la quiniela?`)) return;
    const updated = players.filter(p => p !== name);
    setPlayers(updated);
    storage.set("q_players", updated);
    try { localStorage.removeItem(`q_preds_${name}`); } catch {}
    if (currentPlayer === name) { setCurrentPlayer(null); setPredictions({}); }
    showToast(`${name} eliminado`);
  };

  const selectPlayer = (name) => {
    setCurrentPlayer(name);
    setPredictions(storage.get(`q_preds_${name}`) || {});
    setView("play");
    setSelectedDate(ALL_DATES[0]);
  };

  const setPred = (matchId, side, val) => {
    const v = val.replace(/[^0-9]/g, "").slice(0, 2);
    setPredictions(prev => ({
      ...prev,
      [matchId]: { ...(prev[matchId] || { home: "", away: "" }), [side]: v },
    }));
  };

  const saveCurrent = () => {
    if (!currentPlayer) return;
    storage.set(`q_preds_${currentPlayer}`, predictions);
    showToast("Pronósticos guardados ✓");
  };

  const setResult = (matchId, side, val) => {
    const v = val.replace(/[^0-9]/g, "").slice(0, 2);
    setResults(prev => {
      const next = { ...prev, [matchId]: { ...(prev[matchId] || { home: "", away: "" }), [side]: v } };
      storage.set("q_results", next);
      return next;
    });
  };

  const saveResults = () => {
    storage.set("q_results", results);
    showToast("Resultados guardados ✓");
  };

  const computeStandings = useCallback(() => {
    const rows = players.map(p => {
      const preds = storage.get(`q_preds_${p}`) || {};
      let total = 0, exact = 0, resOk = 0, goalsOk = 0, played = 0;
      for (const m of ALL_MATCHES) {
        const pred = preds[m.id];
        const actual = results[m.id];
        if (!pred || !actual) continue;
        const pts = calcPoints(pred, actual);
        if (pts === null) continue;
        played++;
        total += pts;
        if (pts === PTS_EXACT) exact++;
        else if (pts >= PTS_RESULT) resOk++;
        else if (pts >= PTS_GOALS) goalsOk++;
      }
      return { name: p, total, exact, resOk, goalsOk, played };
    });
    rows.sort((a, b) => b.total - a.total || b.exact - a.exact);
    setStandingsData(rows);
  }, [players, results]);

  useEffect(() => {
    if (view === "standings") computeStandings();
  }, [view, computeStandings]);

  const dateMatches = MATCHES_BY_DATE[selectedDate] || [];

  return (
    <div style={S.app}>
      <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Oswald:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      {toast && <div style={S.toast}>{toast}</div>}

      {/* Header */}
      <div style={S.header}>
        <div style={S.headerInner}>
          <span style={S.headerIcon}>⚽</span>
          <div>
            <h1 style={S.title}>QUINIELA MUNDIAL 2026</h1>
            <p style={S.subtitle}>USA • MEX • CAN</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={S.nav}>
        {[["home","Inicio"],["play","Jugar"],["results","Resultados"],["standings","Tabla"],["rules","Reglas"]].map(([v, label]) => (
          <button key={v} style={view === v ? {...S.navBtn,...S.navBtnActive} : S.navBtn} onClick={() => setView(v)}>{label}</button>
        ))}
      </div>

      {/* ─── HOME ─── */}
      {view === "home" && (
        <div style={S.section}>
          <h2 style={S.sectionTitle}>Jugadores</h2>
          <div style={S.addPlayerRow}>
            <input style={S.input} placeholder="Nombre del jugador" value={newPlayerName}
              onChange={e => setNewPlayerName(e.target.value)} onKeyDown={e => e.key === "Enter" && addPlayer()} />
            <button style={S.addBtn} onClick={addPlayer}>+ Agregar</button>
          </div>
          {players.length === 0 && <p style={S.emptyMsg}>Agrega jugadores para comenzar la quiniela</p>}
          <div style={S.playerGrid}>
            {players.map(p => (
              <div key={p} style={S.playerCard}>
                <div style={S.playerAvatar}>{p.charAt(0).toUpperCase()}</div>
                <span style={S.playerName} onClick={() => selectPlayer(p)}>{p}</span>
                <button style={S.playArrowBtn} onClick={() => selectPlayer(p)}>▶ Jugar</button>
                <button style={S.removeBtn} onClick={() => removePlayer(p)}>✕</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── PLAY ─── */}
      {view === "play" && (
        <div style={S.section}>
          {!currentPlayer ? (
            <div>
              <h2 style={S.sectionTitle}>Elige tu jugador</h2>
              <div style={S.playerGrid}>
                {players.map(p => (
                  <button key={p} style={S.playerCard} onClick={() => selectPlayer(p)}>
                    <div style={S.playerAvatar}>{p.charAt(0).toUpperCase()}</div>
                    <span style={S.playerName}>{p}</span>
                  </button>
                ))}
              </div>
              {players.length === 0 && <p style={S.emptyMsg}>Primero agrega jugadores en Inicio</p>}
            </div>
          ) : (
            <>
              <div style={S.playerBanner}>
                <span style={S.bannerName}>Pronósticos de {currentPlayer}</span>
                <button style={S.changeBtn} onClick={() => { setCurrentPlayer(null); setPredictions({}); }}>Cambiar</button>
              </div>
              <div style={S.dateScroll}>
                {ALL_DATES.map(d => (
                  <button key={d} style={selectedDate === d ? {...S.dateBtn,...S.dateBtnActive} : S.dateBtn} onClick={() => setSelectedDate(d)}>{d}</button>
                ))}
              </div>
              <div style={S.matchList}>
                {dateMatches.map(m => {
                  const pred = predictions[m.id] || { home: "", away: "" };
                  const actual = results[m.id];
                  const pts = calcPoints(pred, actual);
                  return (
                    <div key={m.id} style={S.matchCard}>
                      <div style={{...S.groupTag, background: GROUP_COLORS[m.group]}}>Grupo {m.group}</div>
                      <div style={S.matchRow}>
                        <div style={S.teamSide}>
                          <span style={S.flag}>{FLAGS[m.home] || "🏳️"}</span>
                          <span style={S.teamName}>{m.home}</span>
                        </div>
                        <input style={S.scoreInput} value={pred.home} onChange={e => setPred(m.id,"home",e.target.value)} inputMode="numeric" placeholder="-" />
                        <span style={S.vs}>VS</span>
                        <input style={S.scoreInput} value={pred.away} onChange={e => setPred(m.id,"away",e.target.value)} inputMode="numeric" placeholder="-" />
                        <div style={{...S.teamSide, justifyContent:"flex-end"}}>
                          <span style={S.teamName}>{m.away}</span>
                          <span style={S.flag}>{FLAGS[m.away] || "🏳️"}</span>
                        </div>
                      </div>
                      {pts !== null && (
                        <div style={{...S.ptsLabel, background: pts === PTS_EXACT ? "#27ae60" : pts >= PTS_RESULT ? "#2980b9" : pts > 0 ? "#f39c12" : "#95a5a6"}}>
                          {pts === PTS_EXACT ? `✓ Exacto +${pts}` : pts >= PTS_RESULT ? `✓ Resultado +${pts}` : pts > 0 ? `~ Goles +${pts}` : `✗ 0 pts`}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <button style={S.saveBtn} onClick={saveCurrent}>💾 Guardar pronósticos</button>
            </>
          )}
        </div>
      )}

      {/* ─── RESULTS ─── */}
      {view === "results" && (
        <div style={S.section}>
          <h2 style={S.sectionTitle}>Resultados Oficiales</h2>
          <p style={S.adminNote}>Ingresa los marcadores reales de cada partido</p>
          <div style={S.dateScroll}>
            {ALL_DATES.map(d => (
              <button key={d} style={selectedDate === d ? {...S.dateBtn,...S.dateBtnActive} : S.dateBtn} onClick={() => setSelectedDate(d)}>{d}</button>
            ))}
          </div>
          <div style={S.matchList}>
            {dateMatches.map(m => {
              const res = results[m.id] || { home: "", away: "" };
              return (
                <div key={m.id} style={S.matchCard}>
                  <div style={{...S.groupTag, background: GROUP_COLORS[m.group]}}>Grupo {m.group}</div>
                  <div style={S.matchRow}>
                    <div style={S.teamSide}>
                      <span style={S.flag}>{FLAGS[m.home]}</span>
                      <span style={S.teamName}>{m.home}</span>
                    </div>
                    <input style={{...S.scoreInput, borderColor:"#e74c3c"}} value={res.home} onChange={e => setResult(m.id,"home",e.target.value)} inputMode="numeric" placeholder="-" />
                    <span style={S.vs}>VS</span>
                    <input style={{...S.scoreInput, borderColor:"#e74c3c"}} value={res.away} onChange={e => setResult(m.id,"away",e.target.value)} inputMode="numeric" placeholder="-" />
                    <div style={{...S.teamSide, justifyContent:"flex-end"}}>
                      <span style={S.teamName}>{m.away}</span>
                      <span style={S.flag}>{FLAGS[m.away]}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button style={S.saveBtn} onClick={saveResults}>💾 Guardar resultados</button>
        </div>
      )}

      {/* ─── STANDINGS ─── */}
      {view === "standings" && (
        <div style={S.section}>
          <h2 style={S.sectionTitle}>Tabla de Posiciones</h2>
          {standingsData.length === 0 && <p style={S.emptyMsg}>Agrega jugadores y resultados para ver la tabla</p>}
          <div style={S.standingsTable}>
            <div style={S.standingsHeader}>
              <span style={{...S.sCol, flex:0.5}}>#</span>
              <span style={{...S.sCol, flex:2, textAlign:"left"}}>Jugador</span>
              <span style={S.sCol}>Pts</span>
              <span style={S.sCol}>Ex</span>
              <span style={S.sCol}>Res</span>
              <span style={S.sCol}>Gol</span>
            </div>
            {standingsData.map((row, i) => (
              <div key={row.name} style={i === 0 ? {...S.standingsRow, background:"rgba(241,196,15,0.12)", borderLeft:"3px solid #f1c40f"} : S.standingsRow}>
                <span style={{...S.sCol, flex:0.5, fontWeight:800}}>
                  {i === 0 ? "🏆" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                </span>
                <span style={{...S.sCol, flex:2, fontWeight:600, textAlign:"left"}}>{row.name}</span>
                <span style={{...S.sCol, fontWeight:800, color:"#f1c40f", fontSize:18}}>{row.total}</span>
                <span style={S.sCol}>{row.exact}</span>
                <span style={S.sCol}>{row.resOk}</span>
                <span style={S.sCol}>{row.goalsOk}</span>
              </div>
            ))}
          </div>
          <div style={S.legendBox}>
            <span><b>Pts</b> = Total</span>
            <span><b>Ex</b> = Exactos</span>
            <span><b>Res</b> = Resultado</span>
            <span><b>Gol</b> = Goles</span>
          </div>
        </div>
      )}

      {/* ─── RULES ─── */}
      {view === "rules" && (
        <div style={S.section}>
          <h2 style={S.sectionTitle}>Reglas de Puntaje</h2>
          <div style={S.ruleCard}>
            {[
              { pts: "+5", bg: "#27ae60", title: "Marcador Exacto", desc: "Aciertas el resultado exacto. Ej: pronosticas 2-1 y termina 2-1" },
              { pts: "+3", bg: "#2980b9", title: "Resultado Correcto", desc: "Aciertas quién gana o si es empate, pero no el marcador. Ej: pronosticas 2-0 y termina 3-1" },
              { pts: "+1", bg: "#f39c12", title: "Goles de un equipo", desc: "Aciertas los goles de al menos un equipo pero no el resultado. Ej: pronosticas 2-1 y termina 2-2" },
              { pts: "0", bg: "#95a5a6", title: "Sin acierto", desc: "No aciertas ni resultado ni goles" },
            ].map(r => (
              <div key={r.pts} style={S.ruleRow}>
                <div style={{...S.ruleBadge, background: r.bg}}>{r.pts}</div>
                <div>
                  <p style={S.ruleTitle}>{r.title}</p>
                  <p style={S.ruleDesc}>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={S.ruleNote}>
            <p>📌 Se cuenta el resultado en tiempo reglamentario (90 min). Prórrogas y penales no afectan.</p>
            <p>📌 Desempate: más marcadores exactos, luego más resultados correctos.</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Styles ───
const S = {
  app: {
    fontFamily: "'Archivo Black', 'Oswald', sans-serif",
    minHeight: "100vh",
    background: "linear-gradient(145deg, #0a0f1a 0%, #121e35 40%, #0d1a2d 100%)",
    color: "#fff",
    paddingBottom: 40,
    maxWidth: 480,
    margin: "0 auto",
  },
  toast: {
    position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)",
    background: "#27ae60", color: "#fff", padding: "10px 24px", borderRadius: 30,
    fontFamily: "Oswald, sans-serif", fontSize: 14, letterSpacing: 1, zIndex: 9999,
    boxShadow: "0 4px 20px rgba(39,174,96,0.4)",
  },
  header: {
    background: "linear-gradient(135deg, #1a2744 0%, #2c3e6b 100%)",
    borderBottom: "3px solid #f1c40f", padding: "20px 16px",
  },
  headerInner: { display: "flex", alignItems: "center", gap: 14 },
  headerIcon: { fontSize: 36 },
  title: {
    fontSize: 20, fontFamily: "'Archivo Black', sans-serif", letterSpacing: 3,
    margin: 0, background: "linear-gradient(90deg, #f1c40f, #e67e22)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
  },
  subtitle: { margin: 0, fontSize: 11, letterSpacing: 4, color: "#7f8c9b", fontFamily: "Oswald, sans-serif" },
  nav: {
    display: "flex", overflowX: "auto", background: "#0e1628",
    borderBottom: "1px solid #1e2d4a",
  },
  navBtn: {
    flex: 1, padding: "12px 6px", border: "none", background: "transparent",
    color: "#5a6a8a", fontSize: 12, fontFamily: "Oswald, sans-serif",
    letterSpacing: 1, textTransform: "uppercase", cursor: "pointer",
    borderBottom: "2px solid transparent", transition: "all .2s", minWidth: 60,
  },
  navBtnActive: { color: "#f1c40f", borderBottom: "2px solid #f1c40f" },
  section: { padding: "16px 12px" },
  sectionTitle: {
    fontSize: 20, fontFamily: "'Archivo Black', sans-serif",
    letterSpacing: 2, marginBottom: 16,
    borderLeft: "4px solid #f1c40f", paddingLeft: 12,
  },
  addPlayerRow: { display: "flex", gap: 8, marginBottom: 16 },
  input: {
    flex: 1, padding: "12px 14px", borderRadius: 10, border: "1px solid #2a3a5c",
    background: "#0e1628", color: "#fff", fontSize: 15,
    fontFamily: "Oswald, sans-serif", outline: "none",
  },
  addBtn: {
    padding: "10px 18px", borderRadius: 10, border: "none",
    background: "linear-gradient(135deg, #f1c40f, #e67e22)",
    color: "#0a0f1a", fontWeight: 800, fontSize: 13,
    fontFamily: "Oswald, sans-serif", letterSpacing: 1, cursor: "pointer", whiteSpace: "nowrap",
  },
  emptyMsg: { textAlign: "center", color: "#5a6a8a", fontSize: 14, padding: 30, fontFamily: "Oswald, sans-serif" },
  playerGrid: { display: "flex", flexDirection: "column", gap: 8 },
  playerCard: {
    display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
    background: "linear-gradient(135deg, #141f36, #1a2a4a)",
    borderRadius: 14, border: "1px solid #1e2d4a", color: "#fff",
  },
  playerAvatar: {
    width: 40, height: 40, borderRadius: "50%",
    background: "linear-gradient(135deg, #f1c40f, #e67e22)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 900, fontSize: 18, color: "#0a0f1a",
    fontFamily: "'Archivo Black', sans-serif", flexShrink: 0,
  },
  playerName: { flex: 1, fontSize: 16, fontFamily: "Oswald, sans-serif", letterSpacing: 1, cursor: "pointer" },
  playArrowBtn: {
    padding: "6px 12px", borderRadius: 8, border: "none",
    background: "#27ae60", color: "#fff", fontSize: 11,
    fontFamily: "Oswald, sans-serif", cursor: "pointer", letterSpacing: 1,
  },
  removeBtn: {
    padding: "6px 10px", borderRadius: 8, border: "1px solid #e74c3c33",
    background: "transparent", color: "#e74c3c", fontSize: 13,
    cursor: "pointer", fontWeight: 700,
  },
  playerBanner: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "12px 16px", marginBottom: 12,
    background: "linear-gradient(135deg, #1a2744, #2c3e6b)",
    borderRadius: 12, border: "1px solid #f1c40f33",
  },
  bannerName: { fontFamily: "Oswald, sans-serif", fontSize: 16, letterSpacing: 1 },
  changeBtn: {
    padding: "6px 14px", borderRadius: 20, border: "1px solid #5a6a8a",
    background: "transparent", color: "#7f8c9b", fontSize: 11,
    fontFamily: "Oswald, sans-serif", cursor: "pointer",
  },
  dateScroll: { display: "flex", overflowX: "auto", gap: 6, paddingBottom: 12, marginBottom: 8 },
  dateBtn: {
    padding: "8px 14px", borderRadius: 20, border: "1px solid #1e2d4a",
    background: "#0e1628", color: "#5a6a8a", fontSize: 12,
    fontFamily: "Oswald, sans-serif", cursor: "pointer", whiteSpace: "nowrap", letterSpacing: 1,
  },
  dateBtnActive: {
    background: "linear-gradient(135deg, #f1c40f, #e67e22)", color: "#0a0f1a",
    border: "1px solid #f1c40f", fontWeight: 700,
  },
  matchList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 },
  matchCard: {
    background: "linear-gradient(145deg, #111b30, #162040)",
    borderRadius: 14, padding: "12px 14px", border: "1px solid #1e2d4a",
  },
  groupTag: {
    display: "inline-block", padding: "2px 10px", borderRadius: 6,
    fontSize: 10, fontWeight: 700, color: "#fff", marginBottom: 8,
    fontFamily: "Oswald, sans-serif", letterSpacing: 1,
  },
  matchRow: { display: "flex", alignItems: "center", gap: 6, justifyContent: "center" },
  teamSide: { display: "flex", alignItems: "center", gap: 6, flex: 1, minWidth: 0 },
  flag: { fontSize: 22, flexShrink: 0 },
  teamName: {
    fontSize: 12, fontFamily: "Oswald, sans-serif", letterSpacing: 0.5,
    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
  },
  scoreInput: {
    width: 38, height: 38, textAlign: "center", fontSize: 18, fontWeight: 800,
    borderRadius: 8, border: "2px solid #2a3a5c", background: "#0a0f1a", color: "#f1c40f",
    fontFamily: "'Archivo Black', sans-serif", outline: "none", flexShrink: 0,
  },
  vs: { fontSize: 10, color: "#5a6a8a", fontFamily: "Oswald, sans-serif", letterSpacing: 1, flexShrink: 0, padding: "0 2px" },
  ptsLabel: {
    marginTop: 8, textAlign: "center", padding: "4px 0", borderRadius: 6,
    fontSize: 11, fontWeight: 700, fontFamily: "Oswald, sans-serif", letterSpacing: 1, color: "#fff",
  },
  saveBtn: {
    width: "100%", padding: "14px", borderRadius: 14, border: "none",
    background: "linear-gradient(135deg, #27ae60, #2ecc71)",
    color: "#fff", fontSize: 16, fontWeight: 800,
    fontFamily: "Oswald, sans-serif", letterSpacing: 2, cursor: "pointer",
    boxShadow: "0 4px 20px rgba(39,174,96,0.3)",
  },
  adminNote: { color: "#7f8c9b", fontSize: 13, fontFamily: "Oswald, sans-serif", marginBottom: 12, marginTop: -8 },
  standingsTable: { marginBottom: 14 },
  standingsHeader: {
    display: "flex", padding: "10px 12px",
    background: "#1a2744", borderRadius: "10px 10px 0 0",
    borderBottom: "2px solid #f1c40f",
  },
  standingsRow: {
    display: "flex", alignItems: "center", padding: "12px",
    borderBottom: "1px solid #1e2d4a22",
    background: "linear-gradient(135deg, #111b30, #162040)",
  },
  sCol: { flex: 1, textAlign: "center", fontSize: 14, fontFamily: "Oswald, sans-serif" },
  legendBox: {
    display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center",
    fontSize: 12, color: "#5a6a8a", fontFamily: "Oswald, sans-serif",
  },
  ruleCard: {
    background: "linear-gradient(145deg, #111b30, #162040)",
    borderRadius: 16, padding: 16, border: "1px solid #1e2d4a",
    display: "flex", flexDirection: "column", gap: 18,
  },
  ruleRow: { display: "flex", gap: 14, alignItems: "flex-start" },
  ruleBadge: {
    padding: "8px 14px", borderRadius: 10, fontWeight: 900, fontSize: 18,
    fontFamily: "'Archivo Black', sans-serif", color: "#fff", flexShrink: 0,
    minWidth: 50, textAlign: "center",
  },
  ruleTitle: { margin: 0, fontSize: 15, fontWeight: 700, fontFamily: "Oswald, sans-serif", letterSpacing: 1 },
  ruleDesc: { margin: "4px 0 0", fontSize: 13, color: "#7f8c9b", fontFamily: "Oswald, sans-serif", lineHeight: 1.4 },
  ruleNote: {
    marginTop: 16, padding: 16, borderRadius: 12,
    background: "#0e1628", border: "1px solid #1e2d4a",
    fontSize: 13, color: "#7f8c9b", fontFamily: "Oswald, sans-serif",
    lineHeight: 1.6, display: "flex", flexDirection: "column", gap: 8,
  },
};
