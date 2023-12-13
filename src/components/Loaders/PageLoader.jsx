const PageLoader = () => {
  return (
    <div style={{ height: "100vh" }} className="d-flex align-items-center justify-content-center">
      <div className="position-relative">
        <p className="fw-bold text-white text-loader">PropManageHub</p>
        <div className="loader-page"></div>
        <div className="transparent-circle"></div>
      </div>
    </div>
  );
};
export default PageLoader;
