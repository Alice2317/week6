export default function Home() {
  return (
    <>
      <div className="container">
        <div className="row flex-md-row-reverse flex-column">
          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1526038335545-4b96864eaee7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80
          alt=" className="img-fluid" />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center mt-md-0 mt-3">
            <h2 className="fw-bold">新年快樂</h2>
            <h5 className="font-weight-normal text-muted mt-2">
              全館滿3000打5折
            </h5>
            <div className="input-group mb-0 mt-4">
              <input type="text" className="form-control rounded-0" placeholder="" />
              <div className="input-group-append">
                <button className="btn btn-dark rounded-0" type="button" id="search">
                  Lorem ipsum
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6 mt-md-4">
            <div className="card border-0 mb-4 position-relative position-relative">
              <img
                src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
                className="card-img-top rounded-0"
                alt="..."
              />
              <div className="card-body p-0">
                <h4 className="mb-0 mt-4">Lorem ipsum</h4>
                <div className="d-flex justify-content-between mt-3">
                  <p className="card-text text-muted mb-0 w-75">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod.
                  </p>
                  <button type="button" className="btn btn-outline-dark rounded-0 text-nowrap">
                    Lorem ipsum
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}