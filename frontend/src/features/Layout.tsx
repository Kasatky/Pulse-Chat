import { Outlet } from "react-router-dom";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import Auth from "./auth/Auth";
import { selectIsLoggedIn, selectLoading } from "./auth/selectors";
import Sidebar from "./chat/Sidebar/Sidebar";
import Loading from "../App/Loading";

function Layout(): JSX.Element {
  const authCheckd = useSelector(selectIsLoggedIn);
  const loading = useSelector(selectLoading);
  return (
    <>
      {/* <Box
         className="main"
         
        sx={{
          
          maxWidth: "md",
          hegiht: '100%',
          display: 'flex',
          margin: '7vh 10vw',
          borderRadius: 8,
          overflow: 'hidden',
        }} 
      >
        {loading ? <Loading /> : authCheckd ? <Sidebar /> :
         <Box  sx={{
          
          hegiht: '100%',
          display: 'flex',
          margin: '7vh 10vw',
          borderRadius: 8,
          overflow: 'hidden',
        }}  > <Auth /> </Box> }
        {authCheckd && <Outlet /> }
        
      </Box> */}

      {loading ? (
        <Loading />
      ) : authCheckd ? (
        <Box
          className="main"
          sx={{
            maxWidth: "xs",
            hegiht: "100%",

            display: "flex",
            margin: "7vh 10vw",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <Sidebar />
          <Outlet />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
            p: 25,
            backgroundColor: "secondary.main",
          }}
        >
          <Box
            className="main"
            sx={{
              minWidth: "md",
            
              hegiht: "100%",
              display: "flex",
              m: "auto",
              my: "auto",
              backgroundColor: "#E0E0E0",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <Auth />
          </Box>
        </Box>
      )}
    </>
  );
}

export default Layout;
