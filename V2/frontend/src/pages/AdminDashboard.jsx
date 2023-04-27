import React, { useState, useEffect } from "react";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import AdminNavbar from "../components/AdminNavbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const AdminDashboard = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleAddSubmit = () => {
    console.log(AddUser, AddEmail, AddPass, AddRole);
    fetch("http://localhost:3000/auth/user/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: AddUser,
        email: AddEmail,
        password: AddPass,
        role: AddRole,
      }),
    });
    fetchUsers();
    setShowAdd(false);
  };
  const handleDeleteSubmit = () => {
    var mail = deleteMail;
    console.log("This is the mail:", mail);
    fetch("http://localhost:3000/auth/user/delete/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: mail,
      }),
    });
    fetchUsers();
    setShowDelete(false);
  };
  const [AddEmail, SetAddEmail] = useState("");
  const [AddPass, SetAddPass] = useState("");
  const [AddUser, SetAddUser] = useState("");
  const [AddRole, SetAddRole] = useState("");
  // const [editEmail, Set] = useState("");
  // const [editId, SetId] = useState("");
  // const [editUsername, SetEditUsername] = useState("");
  // const [editPassword, SetEditPassword] = useState("");
  const [deleteID, SetDeleteID] = useState("");
  const [deleteMail, SetDeleteMail] = useState("");
  const [toggleState, setToggleState] = useState(1);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3000/auth/user/");
    const data = await res.json();
    console.log("This are Users:", data);
    $(document).ready(function () {
      let table = $("#users_datatable").DataTable({
        stateSave: true,
        bDestroy: true,
        data: data.users,
        columns: [
          { data: "_id" },
          { data: "username" },
          { data: "email" },
          { data: "role" },
          {
            data: null,
            defaultContent:
              '<div style="display:flex"><button class="btn btn-danger delete-btn" id="adm-dashboard-button-size">Delete</button></div>',
          },
        ],
      });

      // // Handle Add button click
      $(".admin-container").on("click", ".add-btn", function () {
        handleShowAdd();
        console.log("clicked");
      });

      // Handle Delete button click
      $("#users_datatable tbody").on("click", ".delete-btn", function () {
        let td = $(this).closest("tr").find("td:eq(2)");
        if (table.cell(td).data()) {
          console.log(table.cell(td).data());
          SetDeleteMail(table.cell(td).data());
        }
        handleShowDelete();
      });
    });
  };

  const fetchOrgs = async () => {
    const res = await fetch("http://localhost:3000/auth/org/");
    const data = await res.json();
    console.log("This is Orgs:", data);
    $(document).ready(function () {
      $("#orgs_datatable").DataTable({
        stateSave: true,
        bDestroy: true,
        data: data.orgs,
        columns: [{ data: "_id" }, { data: "orgname" }, { data: "email" }],
      });
    });
  };

  fetchUsers();
  fetchOrgs();

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <>
      <AdminNavbar />
      {/* <Tabs/> */}
      <div className="admin-nav-left-span">
        <div className="admin-nav-left-sub-ctn">
          <p
            style={{ padding: "0", margin: "0" }}
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            Admin
          </p>
        </div>

        <div className="admin-nav-left-sub-ctn">
          <p
            style={{ padding: "0", margin: "0" }}
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            Users
          </p>
        </div>
        <div className="admin-nav-left-sub-ctn">
          <p
            style={{ padding: "0", margin: "0" }}
            className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(3)}
          >
            Organizations
          </p>
        </div>
      </div>
      <div className="admin-container">
        <div
          className={
            toggleState === 1 ? "tab-content  active-content" : "tab-content"
          }
        >
          <div className="admin-content-ctn admin-welcome-screen">
            <div className="admin-welcome-ctn">Welcome to Admin Dashboard</div>
          </div>
        </div>

        <div
          className={
            toggleState === 2 ? "tab-content  active-content" : "tab-content"
          } 
        >
          <div className="addButtonInAdminDashBoardCtn add-btn">
          <FontAwesomeIcon
            icon={faUserPlus}
            class="addButtonInAdminDashBoard"
          />
          <p className="addButtonInAdminDashBoardTxt">Add User</p>
        </div>
          <div className="admin-content-ctn user-table-ctn">
            <table id="users_datatable" className="display">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role.</th>
                  <th>Actions</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>

        <div
          className={
            toggleState === 3 ? "tab-content  active-content" : "tab-content"
          }
        >
          <div className="admin-content-ctn org-table-ctn">
            <table id="orgs_datatable" className="display">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>OrgName</th>
                  <th>Email</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>

        <>
          <Modal
            show={showAdd}
            onHide={handleCloseAdd}
            style={{
              transform: "translate(-50%, -25%)",
              top: "40%",
              left: "50%",
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add a User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                <label htmlFor="input-username" className="form-label">
                  Username:
                </label>
                <input
                  type="text"
                  className="input-field"
                  id="input-username"
                  onChange={(e) => SetAddUser(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="input-email" className="form-label">
                  Email address:
                </label>
                <input
                  type="email"
                  className="input-field"
                  id="input-email"
                  onChange={(e) => SetAddEmail(e.target.value)}
                  required
                />
              </div>
              Role:
              <div
                className="mb-3 form-check"
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <div className="form-check">
                  <input
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    style={{
                      cursor: "pointer",
                      accentColor: "var(--secondary-color)",
                    }}
                    onChange={(e) => SetAddRole(e.target.value)}
                    required
                    value="publisher"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                    style={{ cursor: "pointer", marginLeft: "3px" }}
                  >
                    Publisher
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    defaultChecked=""
                    style={{
                      cursor: "pointer",
                      accentColor: "var(--secondary-color)",
                    }}
                    onChange={(e) => SetAddRole(e.target.value)}
                    required
                    value="attendee"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                    style={{ cursor: "pointer", marginLeft: "3px" }}
                  >
                    Attendee
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="input-password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="input-field"
                  id="input-password"
                  onChange={(e) => SetAddPass(e.target.value)}
                  required
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAdd}>
                Cancel
              </Button>
              <Button type="submit" variant="danger" onClick={handleAddSubmit}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showDelete}
            onHide={handleCloseDelete}
            style={{
              transform: "translate(-50%, -25%)",
              top: "50%",
              left: "50%",
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Are you really want to delete it?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDelete}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="danger"
                onClick={handleDeleteSubmit}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
    </>
  );
};

export default AdminDashboard;
