export default function CreateCategory() {
  return (
    <form
      action="/createCategory"
      method="post"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <label for="categorie"></label>
      <input type="text" name="nom" id="categorie" placeholder="Nom" required />
      <button type="submit" id="submit">
        Creer une categorie
      </button>
    </form>
  );
}
