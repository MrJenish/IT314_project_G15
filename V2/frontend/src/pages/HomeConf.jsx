import React from "react";
import Navbar from "../components/Navbar";


const HomeConf = (org) => {

  return (
    <div>
      <Navbar />
      <div className="row">
        <div className="card-header"><h3>Conference Table</h3></div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col" style={{ width: "25%" }}>Conference Name</th>
              <th scope="col" style={{ width: "15%" }}>Start Date</th>
              <th scope="col" style={{ width: "15%" }}>End Date</th>
              <th scope="col" style={{ width: "20%" }}>Speaker</th>
              <th scope="col" style={{ width: "15%" }}>Topic</th>
              <th scope="col" style={{ width: "10%" }}>Register</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row" className="conference_name">Sumit Monpara</td>
              <td className="date">May 6, 2018</td>
              <td className="date">May 7, 2018</td>
              <td className="speaker">Jenish</td>
              <td className="topic">Space Reseach</td>
              <td className="reg_btn"><button type="button" class="btn btn-outline-success btn-sm">Register</button></td>
            </tr>

            
            <tr>
              <td scope="row" className="conference_name">Sumit Monpara</td>
              <td className="date">May 6, 2018</td>
              <td className="date">May 7, 2018</td>
              <td className="speaker">Jenish</td>
              <td className="topic">Space Reseach</td>
              <td className="reg_btn"><button type="button" class="btn btn-outline-success btn-sm">Register</button></td>
            </tr>
            <tr>
              <td scope="row" className="conference_name">Sumit Monpara</td>
              <td className="date">May 6, 2018</td>
              <td className="date">May 7, 2018</td>
              <td className="speaker">Jenish</td>
              <td className="topic">Space Reseach</td>
              <td className="reg_btn"><button type="button" class="btn btn-outline-success btn-sm">Register</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
);
};

export default HomeConf;
  