import { CardMedia } from "@mui/material";

type ImageViewProps = {
	msgImg: any;
};

export default function ImageView({ msgImg }: ImageViewProps): JSX.Element {
	return (
		<CardMedia
			component="img"
			height="300"
			image={`/msgImg/${msgImg}`}
			alt="It was img"
		/>
	)
}