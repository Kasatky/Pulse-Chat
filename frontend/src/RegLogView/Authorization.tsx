import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import InfoBlock from "./InfoBlock";


interface TabPanelProps {
	children: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps): JSX.Element {
	const { children, value, index } = props;

	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`action-tabpanel-${index}`}
			aria-labelledby={`action-tab-${index}`}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</Typography>
	);
}

export default function FloatingActionButtonZoom(): JSX.Element {
	const theme = useTheme();
	const [value, setValue] = React.useState(0);
	const [login, setLogin] = React.useState('');

	const handleChange = (event: unknown, newValue: number): void => {
		setValue(newValue);
	};

	const handleChangeIndex = (index: number): void => {
		setValue(index);
	};

	return (
		<div >
			<Box
				sx={{
					margin: "auto",
					bgcolor: "background.paper",
					width: "30vw",
					height: "10vh",
				}}>
				<InfoBlock />
				<AppBar position="static" color="default">
					<Tabs
						value={value}
						onChange={handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth"
						aria-label="action tabs example"
					>
						<Tab label="Регистрация" />
						<Tab label="Войти" />
					</Tabs>
				</AppBar>
				<SwipeableViews
					axis={theme.direction === "rtl" ? "x-reverse" : "x"}
					index={value}
					onChangeIndex={handleChangeIndex}
				>
					<TabPanel value={value} index={0} >
						<form action="">
							<div>
								<TextField
									sx={{
										bgcolor: "background.paper",
										width: 300,
									}}
									id="outlined-name"
									label="Логин"
									value={login}
									onChange={(event) => { setLogin(event.target.value) }}
								/>
								<TextField
									sx={{
										marginTop: "2vh",
										bgcolor: "background.paper",
										width: 300,
									}}
									id="outlined-name"
									label="Email"
									value={login}
									onChange={(event) => { setLogin(event.target.value) }}
								/>
								<TextField
									sx={{
										marginTop: "2vh",
										marginBottom: "2vh",
										bgcolor: "background.paper",
										width: 300,
									}}
									id="outlined-password-input"
									label="Пароль"
									type="password"
									autoComplete="current-password"
									value={login}
									onChange={(event) => { setLogin(event.target.value) }}
								/>
							</div>
							<Button
								sx={{
									bgcolor: "background.paper",
									color: 'GrayText',
									'&:hover': {
										backgroundColor: '#14212c',
										color: "rgb(139 186 232)",
										borderColor: '#0062cc',
										boxShadow: 'none',
									},
								}}
								type="button" variant="outlined">Зарегистрироваться</Button>
						</form>
					</TabPanel>
					<TabPanel value={value} index={1} >
						<div>
							<TextField
								sx={{
									marginTop: "2vh",
									bgcolor: "background.paper",
									width: 300,
								}}
								id="outlined-name"
								label="Email"
								value={login}
								onChange={(event) => { setLogin(event.target.value) }}
							/>
							<TextField
								sx={{
									marginTop: "2vh",
									marginBottom: "2vh",
									bgcolor: "background.paper",
									width: 300,
								}}
								id="outlined-password-input"
								label="Пароль"
								type="password"
								autoComplete="current-password"
								value={login}
								onChange={(event) => { setLogin(event.target.value) }}
							/>
						</div>
						<Button
							sx={{
								bgcolor: "background.paper",
								color: 'GrayText',
								'&:hover': {
									backgroundColor: '#14212c',
									color: "rgb(139 186 232)",
									borderColor: '#0062cc',
									boxShadow: 'none',
								},
							}}
							type="button" variant="outlined">Войти</Button>
					</TabPanel>
				</SwipeableViews>
			</Box>
		</div>
	);
}
