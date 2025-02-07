import { Layout } from 'antd';
const FooterAnt = Layout.Footer;
export const Footer = () => {
    return <FooterAnt
        style={{
            textAlign: 'center',
            // height: "20px",
            // display: 'flex',
            justifyContent: 'center', // Căn giữa theo chiều ngang
            alignItems: 'center', // Căn giữa theo chiều dọc
            // padding: "15px",
        }}
        className='!p-1'
    >
        Copyright @KBSecurities @{new Date().getFullYear()} | Privacy Policy
    </FooterAnt>

}