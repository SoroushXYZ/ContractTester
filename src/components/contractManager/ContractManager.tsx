import React from "react";

export function ContractManager() {
    return (
        <div className="container px-lg-5">
            <h3 className="text-white fw-bold">Contract Manager</h3>
            <div className="p-4 p-lg-5 rounded-3 bg-dark">
                <div className="row">
                    <div className="col px-4">
                        <label htmlFor="exampleTextarea" className="form-label">
                            Contract ABI
                        </label>
                        <textarea className="form-control json-input" rows={15} defaultValue={""} />
                    </div>
                    <div className="col px-4">
                        <label htmlFor="exampleTextarea" className="form-label">
                            Contract ABI
                        </label>
                        <textarea className="form-control" rows={15} defaultValue={""} />
                    </div>
                </div>
            </div>
        </div>
    );
}
  