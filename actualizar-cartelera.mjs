// Pide a TMDB las películas en cartelera y guarda una lista corta en data/peliculas.json
import { writeFile, mkdir } from "node:fs/promises";

const TOKEN = process.env.TMDB_TOKEN; // la llave: vive como "secreto" en GitHub, nunca dentro de la app
const REGION = "CO";                  // país (código ISO). Cámbialo si hace falta
const IDIOMA = "es-ES";
const CUANTAS = 12;                   // cuántas películas dejamos en la lista

if (!TOKEN) throw new Error("Falta TMDB_TOKEN");

const url = `https://api.themoviedb.org/3/movie/now_playing?language=${IDIOMA}&region=${REGION}&page=1`;
const res = await fetch(url, {
  headers: { Authorization: `Bearer ${TOKEN}`, accept: "application/json" },
});
if (!res.ok) throw new Error(`TMDB respondió ${res.status}`);
const { results } = await res.json();

const peliculas = results
  .filter((m) => m.poster_path)
  .sort((a, b) => b.popularity - a.popularity)
  .slice(0, CUANTAS)
  .map((m) => ({
    id: m.id,
    titulo: m.title,
    sinopsis: m.overview,
    estreno: m.release_date,
    poster: `https://image.tmdb.org/t/p/w342${m.poster_path}`,
  }));

await mkdir("data", { recursive: true });
await writeFile(
  "data/peliculas.json",
  JSON.stringify({ actualizado: new Date().toISOString(), region: REGION, peliculas }, null, 2)
);
console.log(`Guardadas ${peliculas.length} películas`);
