// P11 — Perakit: hanya mengimpor dan memanggil (Farrel Priya Arka Agrapana, 25523185)
import { profil, tahunIni } from "./data.js";
import { state, muat, pulihkan, mulaiNotisia, isiNotisia, gagalNotisia } from "./state.js";
import { render, tampilkanIdentitas, tampilkanKeterampilan } from "./dom.js";
import { pasangPendengar } from "./events.js";
import { ambilNotisia } from "./api.js";

tampilkanIdentitas(profil, tahunIni);
tampilkanKeterampilan(profil.keahlian);
pulihkan();
pasangPendengar();
render(state);

// Alat periksa untuk Console (modul tidak global): console.log(state), console.log(muat())
window.state = state;
window.muat = muat;

// Lapisan data masuk dari P10 dipakai apa adanya
mulaiNotisia();
try {
  isiNotisia(await ambilNotisia());
} catch (galat) {
  gagalNotisia(galat.message);
}
