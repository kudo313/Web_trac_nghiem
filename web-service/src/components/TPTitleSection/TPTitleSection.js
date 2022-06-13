import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography'
import './TPTitleSection.scss'


const TPTitleSection = ({ title }) => {
    return (
        <Box className="title__section" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant={'h5'} component='div' >{title}</Typography>
        </Box>
    )
}

export default TPTitleSection;