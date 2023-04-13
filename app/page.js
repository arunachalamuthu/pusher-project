import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

import Chat from './api/chat/page'

export default function Home() {
  return (
 <div>
 <Chat/>
 </div>
  )
}
