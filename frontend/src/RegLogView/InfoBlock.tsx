import { CardMedia } from "@mui/material";
import { Box } from "@mui/system";
import avatar from './avatar-1841981409(1).png'

export default function InfoBlock(): JSX.Element {

	return (

		<Box
			sx={{
				marginTop: "10vh"
			}}>
			<CardMedia
				component="img"
				width="300"
				height="140"
				image={avatar}
				alt="green iguana"
			/>
			<h4>
				Твой любимый чат!
				Cкорее присоединяйся,
				чтобы начать общаться друзьями!
			</h4>
		</Box>
	)
}