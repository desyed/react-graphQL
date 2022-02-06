import { useRouter } from "next/router";
import Link from "next/link";
export default function Header () {
    const router = useRouter();
    return <div className="header">
        <div className="logo">React GraphQL</div>
        <div className={router.pathname == '/' ? 'header-menu active' : 'header-menu'}><Link href="/">CRUD</Link></div>
        <div className={router.pathname == '/blank' ? 'header-menu active' : 'header-menu'}><Link href="/blank">Blank</Link></div>
    </div>
}