import Head from 'next/head'
import Dashboard from "../core/layouts/dashboard";
import {Menu, Tabs} from "antd";
import {
    UserOutlined,
    FileTextOutlined,
    MessageOutlined,
    PicRightOutlined
} from '@ant-design/icons';
import UserList from "../core/components/user.list";
import CommentList from "../core/components/comment.list";
import PostList from "../core/components/post.list";
import {useState} from "react";
import {useQuery} from "@apollo/client";
import {GET_USERS} from "../core/graphQl/queries/user.query";
import {GET_POSTS} from "../core/graphQl/queries/post.query";
import {GET_COMMENTS} from "../core/graphQl/queries/comment.query";

export default function Home() {
    const [selectedMenu, setSelectedMenu] = useState('USER');
    const {data:users} = useQuery(GET_USERS, {variables: {status: 'draft'}});
    const {data:posts} = useQuery(GET_POSTS);
    const {data:comments} = useQuery(GET_COMMENTS);
    console.log(users, posts, comments)
  return (
    <Dashboard>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
          <div className="col first">
              <Menu
                  style={{ width: '100%' }}
                  defaultSelectedKeys={[selectedMenu]}
                  defaultOpenKeys={['sub1']}
                  mode="vertical"
                  theme="light"
                  onSelect={( {key} ) => {
                      console.log(key)
                      setSelectedMenu(key)
                  }}
              >
                  <Menu.Item key="USER" icon={<UserOutlined />}>
                      Users
                  </Menu.Item>
                  <Menu.Item key="POST" icon={<FileTextOutlined />}>
                      Posts
                  </Menu.Item>
                  <Menu.Item key="COMMENT" icon={<MessageOutlined />}>
                      Comments
                  </Menu.Item>
              </Menu>
          </div>
          {selectedMenu === 'USER' && <UserList users={users || []} posts={posts || []}/>}
          {selectedMenu === 'POST' && <PostList posts={posts || []} comments={comments || []}/>}
          {selectedMenu === 'COMMENT' && <CommentList comments={comments || []} posts={posts || []}/>}
      </main>
    </Dashboard>
  )
}
