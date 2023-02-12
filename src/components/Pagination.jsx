import styled from "styled-components";

const Pagination = ({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
    scrollRef,
}) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    const scrollTop = e => {
        e.current.scrollIntoView({
          behavior: "smooth"
        });
      };

      const handleClick = async (page) => {
        await setCurrentPage(page)
        scrollTop(scrollRef)
      }

  return (
    <Container>
        {
        pages.map((page, index) => {
            return (
                <button
                    key={index}
                    onClick={()=> handleClick(page) }
                    className={page === currentPage ? "active" : ""}
                >
                    {page}
                </button>
            );
        })}
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 1rem 0;

    button {
    width: 30px;
    height: 30px;
    font-family: inherit;
    font-weight: 600;
    font-size: 12px;
    margin: 0 10px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    background: transparent;
    color: #246866;
    border-color: #246866;
    }

    .active {
    font-weight: 900;
    background: #246866;
    color: white;
    }
`;

export default Pagination