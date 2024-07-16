export default function CreadArticle() {
  return (
    <form
      action="/createArticle"
      method="post"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <input type="text" name="nom" id="nom" placeholder="Nom" required />
      <label for="categorie">Choose a category:</label>
      <select name="cat" id="categorie">
        <option value="">--Please choose an option--</option>
        <option value="Bague">Bague</option>
        <option value="Alliance">Alliance</option>
        <option value="Collier">Collier</option>
        <option value="Bracelet">Bracelet</option>
        <option value="Pendentif">Pendentif </option>
        <option value="Boucles d’Oreille">Boucles d’Oreille</option>
      </select>

      <textarea
        name="content"
        id="content"
        placeholder="Description"
        required
      ></textarea>
      <button type="submit" id="submit">
        Creer un billet
      </button>
    </form>
  );
}
