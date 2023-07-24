import { FaStar, FaStarHalfAlt } from "react-icons/fa"; // full, empty
import { AiOutlineStar } from "react-icons/ai"; // half
import styled from "styled-components";


// console.log(Array.from("foo")); // output - ["f","o","o"]
// console.log(Array.from([2.5], x => x + x)); // output - [2,4,6]
// console.log(Array.from([1,2,3], x => x + x)); // output - [2,4,6]
// console.log(Array.from({ length: 5 }, (v,i) => i)); // output - [0,1,2,3,4]
const Star = ({ stars, reviews }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5; //this is to show half star
    debugger;
    return (
        // i=0,i=1,i=2,i=3,i=4
        // stars = 4.4
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar className="icon" />
        ) : stars >= number ? (
          <FaStarHalfAlt className="icon" />
        ) : (
          <AiOutlineStar className="icon" />
        )}
      </span>
    );
  });

  return (
    <Wrapper>
      <div className="icon-style">
        {ratingStar}
        <p>({reviews} customer reviews)</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .icon-style {
    display: flex;
    gap: 0.2rem;
    align-items: center;
    justify-content: flex-start;
    .icon {
      font-size: 2rem;
      color: orange;
    }
    .empty-icon {
      font-size: 2.6rem;
    }
    p {
      margin: 0;
      padding-left: 1.2rem;
    }
  }
`;

export default Star;