import FullPost from "@/components/pages/FullPost";
import Posts from "@/components/pages/Posts";
import NewPost from "@/components/pages/NewPost";
import Payment from "@/components/pages/Payment";
import Checkout from "@/components/pages/Checkout";
export const routes = [
  { path : "/", component : Posts},
  { path : "/product/create", component : NewPost},
  { path : "/product/:id/edit", component : NewPost},
  { path : "/product/:id", component : FullPost},
  { path : "/payment", component : Payment},
  { path : "/checkout", component : Checkout},
  { path : "*", redirect : "/"},
  { path : "/redirect", redirect : "/"}
]
