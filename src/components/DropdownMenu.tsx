import { Box, Menu } from "@mui/material";
import { useState } from "react";

type DropdownProps = {
    element: any,
    items: any
}



const DropdownMenu = (props: DropdownProps) => {
    

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    
    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
  
      const handleCloseMenu = () => {
        setAnchorEl(null);
      };  
  

    return (
        <>
            <Box sx={{ alignSelf: 'center'}} onClick={handleOpenMenu}>
                {props.element}       
            </Box>
        <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}>
            {props.items.map((item, index) => 
                <Box key={`item-${index}`} onClick={handleCloseMenu}>
                    {item}
                </Box>
            )}
        </Menu>
        </>
    )
}

export default DropdownMenu;