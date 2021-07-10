import {React, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Icon from "@material-ui/core/Icon";
import axios from "../../axios";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

function AddBook() {
  const classes = useStyles();

  // book Details states
  const [bookName, setbookName] = useState("");
  const [bookISBN, setbookISBN] = useState("");
  const [SP, setSP] = useState("");
  const [MRP, setMRP] = useState("");
  const [bookDesc, setbookDesc] = useState("");
  const [Weight, setWeight] = useState("");
  const [Edition, setEdition] = useState("");
  const [Qnty, setQnty] = useState("");
  const [author, setAuthor] = useState("");
  const [pickupId, setPickupId] = useState("");
  const [tags, setTags] = useState([]);
  const [tag, settag] = useState("");
  const [link, setlink] = useState("");

  const [checked, setChecked] = useState(false);
  const [Photo, setPhoto] = useState(null);
  const [Image, setImage] = useState(null);
  const [load, setload] = useState(false);
  const [Adr, setAdr] = useState(null);
  const [alert, setalert] = useState({
    show: false,
    type: "",
    msg: "",
  });

  useEffect(() => {
    axios
      .get("/getAddressList")
      .then((response) => {
        response.data.sort((a, b) => {
          return a.updatedAt < b.updatedAt
            ? 1
            : a.updatedAt > b.updatedAt
            ? -1
            : 0;
        });
        setAdr(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  const handelUpload = (e) => {
    setPhoto(Array.from(e.target.files));
    setImage(Array.from(e.target.files));
    console.log(Array.from(e.target.files));
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // book adding
  const handelBookAdd = () => {
    setload(true);
    axios
      .post("/addBook", {
        title: bookName,
        MRP: Number(MRP),
        price: Number(SP),
        editionYear: Number(Edition),
        author: author,
        ISBN: bookISBN,
        pickupAddressId: pickupId,
        description: bookDesc,
        photos: Photo,
        weightInGrams: Number(Weight),
        embedVideo: link,
        tags: tags,
        qty: Number(Qnty),
      })
      .then((response) => {
        console.log(response.data);
        setload(false);
        setalert({
          show: true,
          type: "success",
          msg: response.data.msg,
        });
        setTimeout(() => {
          Initialize();
        }, 5000);
      })
      .catch((error) => {
        console.log(error.response.data.errors[0].error);
        setload(false);
        setalert({
          show: true,
          type: "error",
          msg: error.response.data.errors[0].error + " Please Try Again!",
        });
      });
  };

  const Initialize = () => {
    setbookName("");
    setbookISBN("");
    setSP("");
    setMRP("");
    setbookDesc("");
    setWeight("");
    setEdition("");
    setQnty("");
    setAuthor("");
    setPickupId("");
    setTags([]);
    settag("");
    setlink("");

    setChecked(false);
    setPhoto(null);
    setImage(null);
    setload(false);
    setalert({
      show: false,
      type: "",
      msg: "",
    });
  };
  const handleDelete = (e) => {
    setTags(tags.filter((tag) => e.target.innerHTML !== tag));
  };

  return (
    <div className="add-book-bg">
      <h1> ADD NEW BOOK </h1>
      <form action="" className="add-book-form" autoComplete="off">
        <div className="add-book-field1">
          <span>
            <i className="fas fa-book"></i>
          </span>
          <input
            type="text"
            placeholder="Book Full Name"
            onChange={(e) => setbookName(e.target.value)}
            value={bookName}
          />
        </div>
        <div className="add-book-field1">
          <span>
            <i className="fas fa-atlas"></i>
          </span>
          <input
            type="text"
            placeholder="Book ISBN Number"
            onChange={(e) => setbookISBN(e.target.value)}
            value={bookISBN}
          />
        </div>
        <div className="add-book-field2">
          <span>
            <i className="fas fa-rupee-sign"></i>
          </span>
          <input
            type="number"
            placeholder="Selling Price"
            onChange={(e) => setSP(e.target.value)}
            value={SP}
          />
          <input
            type="number"
            placeholder="M.R.P"
            onChange={(e) => setMRP(e.target.value)}
            value={MRP}
          />
        </div>
        <div className="add-book-field1">
          <span>
            <i className="fas fa-info"></i>
          </span>
          <input
            type="text"
            placeholder="Book Details"
            onChange={(e) => setbookDesc(e.target.value)}
            value={bookDesc}
          />
        </div>
        <div className="add-book-field1">
          <span>
            <i className="fas fa-weight"></i>
          </span>
          <input
            type="number"
            placeholder="Weight in grams(if possible)"
            onChange={(e) => setWeight(e.target.value)}
            value={Weight}
          />
        </div>
        <div className="add-book-field1">
          <span>
            <i className="fab fa-etsy"></i>
          </span>
          <input
            type="number"
            placeholder="Book Edition (Year)"
            onChange={(e) => setEdition(e.target.value)}
            value={Edition}
          />
        </div>
        <div className="add-book-field1">
          <span>
            <i className="fas fa-user-edit" />
          </span>
          <input
            type="text"
            placeholder="Book Author"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
        </div>
        <div className="add-book-field1">
          <span>
            <i className="fas fa-archive" />
          </span>
          <input
            type="number"
            placeholder="Quantity"
            onChange={(e) => setQnty(e.target.value)}
            value={Qnty}
          />
        </div>
        <div className="add-book-field1">
          <span>
            <i className="fas fa-address-book" />
          </span>
          <select
            name=""
            id=""
            style={{
              height: "50px",
              width: "500px",
              outline: "none",
              fontFamily: "PT Sans",
              paddingLeft: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.87)",
              border: "none",
            }}
            onChange={(e) => {
              setPickupId(e.target.value);
            }}
          >
            <option> Select Address</option>
            {Adr !== null ? (
              <>
                {Adr.map((adr) => (
                  <option value={adr._id}>{adr.address}</option>
                ))}
              </>
            ) : (
              <></>
            )}
          </select>
        </div>
        <div className="add-book-field1">
          <span>
            <i className="fab fa-youtube" />
          </span>
          <input
            type="text"
            placeholder="Embed Youtube Video Link"
            onChange={(e) => setlink(e.target.value)}
            value={link}
          />
        </div>
        <div className="add-book-field1" style={{display: "block"}}>
          <div className="book-tags" id="add-book-tag">
            {tags.length > 0 ? (
              <>
                {tags.map((name) => (
                  <Link
                    className="tag"
                    onClick={(e) => {
                      handleDelete(e);
                    }}
                  >
                    {name}
                  </Link>
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
          <div style={{display: "flex"}}>
            <input
              type="text"
              placeholder="Add Book Tags"
              onChange={(e) => settag(e.target.value)}
              value={tag}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  let memo = tags;
                  memo.push(tag);
                  setTags(memo);
                  settag("");
                }
              }}
            />
            <span
              style={{cursor: "pointer"}}
              onClick={() => {
                let memo = tags;
                memo.push(tag);
                setTags(memo);
                settag("");
              }}
            >
              <i className="fas fa-plus-circle" />
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <div className="upload-btn-wrapper">
            <button style={{width: "250px"}}>Upload Images</button>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/ico, image/svg"
              onChange={(e) => {
                handelUpload(e);
              }}
              style={{width: "250px", left: "20px"}}
              multiple
            />
            <span style={{fontFamily: "PT Sans", fontSize: "12px"}}>
              At least 3 clear images of book. (Front, Back, Side)
            </span>
          </div>
          <div
            className="uploaded-images"
            style={{
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            {Image !== null ? (
              <>
                {Image.map((file) => (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="book"
                    height="60px"
                    width="60px"
                  />
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{"aria-label": "primary checkbox"}}
          />
          <span style={{fontFamily: "PT Sans", fontWeight: "bold"}}>
            {" "}
            I agree to Terms and Conditions
          </span>
        </div>
        <div>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            endIcon={<Icon>send</Icon>}
            style={{fontFamily: "PT Sans", fontWeight: "bold"}}
            onClick={(e) => {
              e.preventDefault();
              if (checked) {
                handelBookAdd();
              }
            }}
          >
            <i
              className="fas fa-circle-notch"
              style={{
                display: load ? "inline-block" : "none",
                animation: "spin 2s linear infinite",
              }}
            />
            &nbsp;Submit For Review
          </Button>
        </div>
      </form>
      <div
        className={classes.root}
        style={{display: alert.show ? "flex" : "none"}}
      >
        <Alert
          variant="outlined"
          severity={alert.type}
          style={{
            fontFamily: "PT Sans",
            fontWeight: "bold",
            color: alert.type === "success" ? "yellowgreen" : "red",
            width: "500px",
          }}
        >
          {alert.msg}
        </Alert>
      </div>
    </div>
  );
}
export default AddBook;
