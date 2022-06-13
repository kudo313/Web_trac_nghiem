import {
  Avatar,
  Box,
  ImageListItem,
  Typography,
  Container,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./TPUploadImage.scss";
import AddIcon from "@mui/icons-material/Add";
const TPUploadImage = ({ img, setImg, type }) => {
  const uploadImage = (e) => {
    const img = document.getElementById("upload-image");
    if (window.FileReader) {
      var file = e.target.files[0];
      var reader = new FileReader();
      if (file && file.type.match("image.*")) {
        reader.readAsDataURL(file);
      } else {
        img.style.display = "none";
        img.setAttribute("src", "");
      }
      reader.onloadend = function (e) {
        const result = reader.result;
        setImg(result);
        img.style.display = "block";
      };
    }
  };

  const buttonAdd = () => {
    return (
      <Box
        sx={{
          width: 180,
          height: 180,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: type === "avatar" ? "50%" : "12px",
        }}
        className='button__add'
      >
        <AddIcon fontSize='large' />
      </Box>
    );
  };

  return (
    <Container className='upload-image__section'>
      <Box>
        {img ? (
          type === "avatar" ? (
            <Avatar
              src={img}
              sx={{
                width: 180,
                height: 180,
                display: "flex !important",
                justifyContent: "center",
                alignItems: "center",
              }}
              id='upload-image'
              className='image__avatar'
            />
          ) : (
            <img
              src={img}
              id='upload-image'
              width={180}
              height={180}
              class='image__other'
            />
          )
        ) : (
          buttonAdd()
        )}
      </Box>
      <label
        class='custom-file-upload'
        style={{ borderRadius: type === "avatar" ? "50%" : "12px" }}
      >
        <input
          type='file'
          variant='standard'
          label='Avatar'
          onChange={uploadImage}
        />
        <AddIcon fontSize='large' />
      </label>
    </Container>
  );
};

export default TPUploadImage;
