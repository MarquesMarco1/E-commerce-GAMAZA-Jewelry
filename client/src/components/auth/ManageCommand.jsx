export default function ManageCommand() {
  return (
    <div>
      <ul className="border-2 bg-white border m-2.5 rounded-2xl p-2.5">
        <li>
          <h3>Order number</h3>
        </li>
        <li>Articles</li>
        <li>Adress</li>
        <li>Total</li>
        <li className=" text-center	">
          <button className="rounded-lg bg-light-purple p-2.5 mt-2">
            Confirmed
          </button>
        </li>
      </ul>
      <ul className="border-2 bg-white border m-2.5 rounded-2xl p-2.5">
        <li>
          <h3>Order number</h3>
        </li>
        <li>Articles</li>
        <li>Adress</li>
        <li>Total</li>
        <li className=" text-center	">
          <button className="rounded-lg bg-light-purple p-2.5 mt-2">
            Shipped
          </button>
        </li>
      </ul>
    </div>
  );
}
