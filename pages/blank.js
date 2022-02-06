import Dashboard from "../core/layouts/dashboard";
import {Empty} from "antd";
export default function Blank () {
    return <Dashboard>
    <Empty imageStyle={{marginTop: 30}} description={'This page is empty.'}/>
    </Dashboard>
}