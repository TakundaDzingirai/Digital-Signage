import { MenuItem } from "@mui/material";
export function MenuItems({ screenData }) {
    return (


        screenData.map((item) => (
            <MenuItem key={item._id} value={item._id}>
                {item.screenName}
            </MenuItem>
        ))


    );
}
