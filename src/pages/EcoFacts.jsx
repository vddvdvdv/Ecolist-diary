import { useState } from 'react'
import { ShareIcon, RefreshIcon } from '../components/icons'

const factOfTheDay = {
  title: 'Fact of the Day',
  content: 'Recycling one aluminum can saves enough energy to run a TV for three hours.',
  source: 'Source: EPA',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDu1x_4EbcSIX85_jEeL7ueAS4zTiTiVZMSpEMMnaoRqkUGUwH0d62RKTtz7Dx31oa8Fpb7BJCUHWZByhf3gETco0-WJPOogsr3ACNN2e8JYwG7mHzvRV0ZN1K2wIVHBEjvCw3KaZj7M6dXQF9kG6NvTnNg7KqMq4yTZLIlIqeGjEUcLgijs82NvH7hZ9zjBV760pkpPNGP8wRrJYooLQsMuxlm7RweUCHaAD6N5pIL4T8kDLLh5GOwWSUSQL1OIF7FLI_iyP21lij6',
}

const pastFacts = [
  {
    id: 1,
    title: 'Deforestation',
    content: 'A single tree can absorb up to 48 pounds of carbon dioxide per year.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAx0Txj1XtrB9UX3anBwNM4bZ1hA715ou3aJ_MFOmnp9Ccqigil2FPdXXeN-eSbelQzAGqg4boEjFuw7LEgYMchXmxVVnWTKx_TrVCh7bqeYtQOpGWqsB1_AuQCHjOAYgWbb09iZCOBYT195rLY-cSlrzi1AEkFxdqxm9veF8d8rY6tCy1TXlmv1a1KQ9J5bx2wTcAWmjYqBXOm0GRKA8ww8YD8Z94Ecbd7NuOQuUrdEGWuHUYzfDks_sQMxeVhVXcq5aizCSMoyat4',
  },
  {
    id: 2,
    title: 'Water Conservation',
    content: 'Turning off the tap while brushing your teeth can save 8 gallons of water per day.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgmFKYlxf8Tm55CKFq23hJxQdNmrOBiVrOKhD3_818Rkgrzn1mHSi0AR0wzFtMLHwEdBl_UGX-j4hSPh90LdgXnZ7wGYw9sRQwzzbnMTRnZRpPuJ35K-CsfBlcHTcgqlloJY7wSNGtHqww5_UGn1Ac3PGZTPnlhOxI2-wcpe-Xob5Au6oJ5oqcgn7tLGJpq1Tk6M5g1pKzQx2ocXm8kAL4KnoypmnRqNMMiv9zhyr146db16kapyEF6gtYA3knGT-9ZEde4744Vje3',
  },
  {
    id: 3,
    title: 'Biodiversity',
    content: 'Bees are responsible for pollinating about 75% of the world\'s flowering plants.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnVcYbn6rZoFdLTCtBefcAHcyKK7B1sCF1xzCcgxgk34sEeZzdLaoPk5XDxftv4Nf7N_VvkhavsIzQk2eDVtjdn2GMuABB2Bxf7O3EDpLBjmRRGnsF5s7Yr0TQ2VGsk2SrD9Z1ckI-V7Hj9Yd7WBsBjtqhzMeT8dtDxcrh_sW9L7ihp5gnzHx0HOUqEUXzN4SdfuJ3QDWuq3a9TcU1R3dVSe6Evi-FUsMC1N9gM42JHO7wfEWnDq7hCgw6Z8Af1tav2HSh4VFwbhbC',
  },
]

export default function EcoFacts() {
  const [currentFact, setCurrentFact] = useState(factOfTheDay)

  const getNewFact = () => {
    // In a real app, this would fetch a new fact from an API
    const randomFact = pastFacts[Math.floor(Math.random() * pastFacts.length)]
    setCurrentFact({
      title: randomFact.title,
      content: randomFact.content,
      source: 'Source: Environmental Research',
      image: randomFact.image,
    })
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-wrap justify-between gap-3 p-4 pt-10">
        <p className="text-4xl font-black leading-tight tracking-tight text-text-light dark:text-text-dark min-w-72">
          Eco Facts
        </p>
      </div>

      {/* Fact of the Day Card */}
      <div className="p-4">
        <div className="flex flex-col items-stretch justify-start rounded-xl md:flex-row md:items-start shadow-lg bg-card-light dark:bg-card-dark overflow-hidden">
          <div
            className="w-full md:w-1/3 bg-center bg-no-repeat aspect-video md:aspect-square bg-cover"
            style={{ backgroundImage: `url(${currentFact.image})` }}
          />
          <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-4 p-6 md:p-8">
            <p className="text-lg font-bold leading-tight tracking-tight text-text-light dark:text-text-dark">
              {currentFact.title}
            </p>
            <div className="flex flex-col gap-4">
              <p className="text-xl font-normal leading-normal text-text-secondary-light dark:text-primary/90">
                {currentFact.content}
              </p>
              <p className="text-base font-normal leading-normal text-text-secondary-light/80 dark:text-primary/70">
                {currentFact.source}
              </p>
            </div>
            <div className="flex items-center gap-3 justify-end mt-4">
              <button className="btn-primary px-4 h-10 text-sm flex items-center gap-2">
                <ShareIcon className="w-5 h-5" />
                Share on Ekolist Feed
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Get New Fact Button */}
      <div className="flex px-4 py-3 justify-center">
        <button
          onClick={getNewFact}
          className="btn-secondary px-4 h-10 text-sm flex items-center gap-2"
        >
          <RefreshIcon className="w-5 h-5" />
          Get New Fact
        </button>
      </div>

      {/* Past Facts Section */}
      <h2 className="text-[22px] font-bold leading-tight tracking-tight text-text-light dark:text-text-dark px-4 pb-3 pt-12">
        Explore Past Facts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {pastFacts.map((fact) => (
          <div
            key={fact.id}
            className="flex flex-col rounded-xl shadow-md bg-card-light dark:bg-card-dark overflow-hidden"
          >
            <div
              className="w-full bg-center bg-no-repeat aspect-video bg-cover"
              style={{ backgroundImage: `url(${fact.image})` }}
            />
            <div className="p-4 flex flex-col gap-1">
              <p className="text-base font-bold leading-tight text-text-light dark:text-text-dark">
                {fact.title}
              </p>
              <p className="text-sm font-normal leading-normal text-text-secondary-light dark:text-primary/90">
                {fact.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

