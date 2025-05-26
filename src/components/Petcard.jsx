import "../Styles/Petcard.css";

export default function Petcard() {
  const dogBreeds = [
    {
      id: 1,
      breed: "Labrador Retriever",
      age: 2,
      image: "src/assets/Images/Labrador.jpg",
      price: "₹11,999",
      description: "Friendly and outgoing, good with families.",
    },
    {
      id: 2,
      breed: "German Shepherd",
      age: 3,
      image: "src/assets/Images/germanshepherd.jpg",
      price: "₹15,999",
      description: "Loyal and intelligent, great for security.",
    },
    {
      id: 3,
      breed: "Pomarian",
      age: 3,
      image: "src/assets/Images/pomarian.jpg",
      price: "₹9,499",
      description: "Small, energetic, and alert. Great companions.",
    },
    {
      id: 4,
      breed: "Pitbull",
      age: 3,
      image: "src/assets/Images/pitbull.jpg",
      price: "₹19,999",
      description: "Strong and loyal, needs experienced handling.",
    },
  ];

  return (
    <div className="main-container">
      {dogBreeds.map((dog) => (
        <div key={dog.id} className="card">
          <div className="image_container">
            <img src={dog.image} alt={dog.breed} className="image" />
          </div>
          <div className="title">
            <span>{dog.breed}</span>
          </div>
          <div className="size">
            <h4>Age: {dog.age}</h4>
            <p>{dog.description}</p>
          </div>
          <div className="action">
            <div className="price">
              <span>{dog.price}</span>
            </div>
            <button className="cart-button">
              <svg
                className="cart-icon"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
              <span>Add to cart</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
