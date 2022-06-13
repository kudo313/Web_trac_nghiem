import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function TPCardItem({ image, name, count, type, ...rest }) {
  const imageTemplate = (
    <MKBox
      bgColor='white'
      borderRadius='xl'
      shadow='lg'
      minHeight='10rem'
      sx={{
        overflow: "hidden",
        transform: "perspective(999px) rotateX(0deg) translate3d(0, 0, 0)",
        transformOrigin: "50% 0",
        backfaceVisibility: "hidden",
        willChange: "transform, box-shadow",
        transition: "transform 200ms ease-out",

        "&:hover": {
          transform:
            "perspective(999px) rotateX(7deg) translate3d(0px, -4px, 5px)",
        },
        aspectRatio: "1/1",
        backgroundImage: `url(${image})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      {...rest}
    >
      {/* <img component='img' src={image} alt={name} width='100%' my='auto' /> */}
    </MKBox>
  );

  return (
    <MKBox position='relative'>
      {imageTemplate}
      {name || count > 0 ? (
        <MKBox mt={1} ml={1} lineHeight={1}>
          {name && (
            <MKTypography variant='h6' fontWeight='bold'>
              {name}
            </MKTypography>
          )}
          {count > 0 && (
            <MKTypography
              variant='button'
              fontWeight='regular'
              color='secondary'
            >
              {count} {type}
            </MKTypography>
          )}
        </MKBox>
      ) : null}
    </MKBox>
  );
}

export default TPCardItem;
