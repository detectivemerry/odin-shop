import Image from 'next/image'

export default function Home() {
  return (
    <main className = "m-[10vw]">
      <div className = "text-center text-7xl m-[10vh] underline decoration-orange-800">
        Mama shop
      </div>
      <div className = "p-4 bg-teal-50 w-[40vw] m-auto">
        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>     
        <br/>
        <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </div>
    </main>
  )
}
