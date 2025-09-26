import Slider from "react-slick";
import { FaMusic, FaLaptopCode, FaBriefcase, FaPalette, FaUtensils, FaFootballBall, FaHeartbeat, FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const categories = [
  { name: 'Music', icon: <FaMusic />, count: 245 },
  { name: 'Technology', icon: <FaLaptopCode />, count: 189 },
  { name: 'Business', icon: <FaBriefcase />, count: 156 },
  { name: 'Arts & Culture', icon: <FaPalette />, count: 98 },
  { name: 'Food & Drink', icon: <FaUtensils />, count: 112 },
  { name: 'Sports', icon: <FaFootballBall />, count: 87 },
  { name: 'Health', icon: <FaHeartbeat />, count: 76 },
  { name: 'Education', icon: <FaBook />, count: 134 }
];


const CategoryCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ]
  };

  return (
    <section className="event-categories">
      <div className="container">
        <div className="section-header">
          <h2>Explore by <span className="text-primary">Category</span></h2>
          <p>Find events that match your interests and passions</p>
        </div>

        <Slider {...settings} className="categories-slider">
          {categories.map((category, index) => (
            <Link
              to={`/events?category=${category.name.toLowerCase()}`}
              key={index}
              className="category-card"
            >
              <div className="category-icon">{category.icon}</div>
              <h3 className="category-name">{category.name}</h3>
              <p className="category-count">{category.count} events</p>
            </Link>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default CategoryCarousel;
