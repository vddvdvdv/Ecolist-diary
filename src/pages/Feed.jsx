import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { HeartIcon, MessageIcon, ShareIcon, StarIcon, ImageIcon, MapPinIcon } from '../components/icons'

const feedPosts = [
  {
    id: 1,
    user: {
      name: 'Alex Johnson',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5H6pttfmpIEgZ841ngfCclPrJaGRgy0f11AE4aOgbzULOhsApS7x4bqLWjQP_-LX6_FW5JIfIqDMIu1ccG59r9FMvQBQhAWQySKoDzwRCBnTG0Txrmyyvw__qjhNXf88v62ZFuiZ-hAo13A50PnqnpEiV_k0MvAXDFA0IR8YvNpeiBQP4FQTWLN1STjFQpx26589SoS2lGJH4N4C1PSr__KTqNaqfqjZNg6Jk1uk_Ix7if4MzJ_MxlC9V3kh7zOGleO_HDyM8gDY2',
      school: 'Greenwood Academy',
    },
    content: 'Just finished a beach cleanup with my family! We collected two full bags of trash. It\'s amazing how much difference a small group can make. Feeling proud and tired!',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvoewcWOxFyX66QIbl2R5W3krVO5mgoUaiD3rpLMkTRefElqAhoxszylgMJkVXn3IMgM4mT7HFOMUc7nj1_2oTJi-xv5TJ1U5UHn1BMAomMDZt5COThDmeUsRPXUBKZLfKTFFkEDxUXhY8PWFnrHNbrj_rlxCvM8Rjnh_wvFcYSIFwucxbtOJgwIAloxmhLSiIyhOUktB27_QS8b4kw6Szbuxm4GzpzgIjSgIexzYqDdVNeS5uUljzdIUPLRx7djsOQT-wS_aXZzJP',
    likes: 12,
    celebrations: 8,
    premium: 5,
    comments: 3,
    time: '2 hours ago',
    points: 15,
  },
  {
    id: 2,
    user: {
      name: 'Maria Garcia',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCG_hxiTNgoa6lwA6-9SCtdJmK6-HPjM5uMLGe37nUOM8zGAbXDCp12proqV2_jRtGBU5l4p-1CY9DEl6ZTDiLkSWW3PcJFK7BJ3-jovU7ItpIEZ-kax3LDzYQCuXcwKXoVPd4_4a8D7G5PGaYTC-Q1tk3GjSOECa_5576eRmjGavwZBNNIFBb6fmbs0TIs4RTUuiDL4zRNyUuJI9JO8Tbu-W2tXtYmcEjU0UPnOJNxCPhzC6kIpppLLxwaGCWlwbN1XrtCJ08L17b9',
      school: 'Oak Valley University',
    },
    content: 'Made a reusable shopping bag from an old t-shirt! No more plastic bags for me. It was surprisingly easy and fun. #DIY #EcoFriendly',
    likes: 9,
    celebrations: 15,
    premium: 3,
    comments: 5,
    time: 'Yesterday at 4:30 PM',
    points: 10,
  },
  {
    id: 3,
    user: {
      name: 'Chen Wei',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV6E7G7sjW14RSUk1oBUOJoNGEsBSGs1lXLVCToXR6m6xeSgb6h5neSRduLdrde__nQ3PvHEcTIbywxaCn5N_15XGy1Ja1bCKNjo8Lqj7_eHMHLzm51kZiyCrUFtI4128ysg6ugyACIAb76zv5r_Eq4vbn_bUfzNnlmhnfPN_Ai1q7IqpVJtyOhBjjtGu7ymuMvueFarslIICJHXjCDqezXX8V9_yvsHxuwa3J-PCPXpMzGa9is6uizv4BnCAf0Wyna9w7xOIzk52o',
      school: 'Pine Ridge Academy',
    },
    content: 'Started a compost bin for our kitchen scraps today! Excited to reduce our food waste and create nutrient-rich soil for our garden.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUjQdHQbe-decWXID2V4mPKhCJcJcVC4OySBieXnNSPH7yqcTOuWD3mHTdQCKvtbfWwnUkk3hbmo4ayg6a0_lsgfa5y02xnQoAlwI1FcorO6SF0UAltX9GEuM3EfmXvERli2qo44V3MuZGg972e1D56Xnq2CTx0Q5NR4J25qrrgy_lDWKUvWxbXKjvfAONQc9g73Eaj9AFyz2ALiM6SFpqyy-SMg0kG_KI7H4E8iEUjgv_prUCqUIHjWMRrLOtOSNYHx4-YBhewpRW',
    likes: 21,
    celebrations: 11,
    premium: 18,
    comments: 7,
    time: '3 days ago',
    points: 20,
  },
]

const topDeeds = [
  {
    id: 1,
    rank: 1,
    name: 'Sarah Lee',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9QFLUq2C5tMGhlyIjYoOVt5CU73IMMronSZNfVDPwTpHcIbiU2TP023Iv4K23wc3ON2O57UTlMkLNudFZDpk2mJnuVFIxQ2syi8FsbBs-DQSVWnH7DwpyCshVnzLBnoblc_lIQX0kwHQ-kaDV193cvXCLWYkeMpGngwLhuQRTdN20oiP8OE4BSoymdXz2C9-AGRs4P238eBLEE6dPLRbATpBpMeQu4jwpEanrLcdNwAFek1faus1G2oog5jxEYA8502DJMbz8Jb7z',
    deed: 'Organized a park cleanup',
    points: 150,
  },
  {
    id: 2,
    rank: 2,
    name: 'Chen Wei',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk-RvYSNUbOdtR83_-zw3qkEvOnDZAcapGtyPxsRwUxcP-PLD4QVPN-O2mJp-FUeWGDzQRsOgFRt7Xh4xCsNosZ1m8LTaZFM3DW8PQ4sM-UcxZAyK5qmap1vJ9cu6QiEAPvfTdxFCuQcdiaCue9ZpSZ3l_jyPIzRabJzWgn9wpUCQ-iTaI9McUJPaoiW2MlYvBso3YCIPZNxUDM-_H9ulimx7Equ_gXtFSV5JUF4gzQ-2jxYNf5tZqOh6MldPvYvlnBz67iR4FeNcM',
    deed: 'Started school compost program',
    points: 125,
  },
  {
    id: 3,
    rank: 3,
    name: 'Alex Johnson',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCwwSyaYf9nUHWUp9MgXpuOhs29r1neVJYdpElQjm-GxhFUt9s3l7gwfcfJhR8zAxAMYKtO91EHd7HFylDc6Ciu2CFgrPF-H3SgpA5zOtk8y5G3zUkELvxACDrkESv3F9tEmeOFNMR0WnQHLJo4PlEaCKBzKk1i6PZ0w2FRhwFRKNuTl8Q7PrCDoHmabO9otFdhdtdcsc3ITOfFHUU21T8edLXFT8rEfrhKJhonlxYYHPe1pbTyFWQuQd9RFbIJ_gTtyYVY7zvtQ9p',
    deed: 'Consistent recycling efforts',
    points: 98,
  },
  {
    id: 4,
    rank: 4,
    name: 'Maria Garcia',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHSYzNK1p5TRC_Jf-M-yu5SoGTM-H_qrXgRT-IlOJfLaGMc8KLJAwoWkQ_fIpzhYjpQbp40BJltV6EPcNZ-6KoeSmkII1pe5Iv2FfrHVW2Tk6qu-rirqSpYvr_eMsbIbd4gV-YTneji-ZI9IdQAU0jp45RRt3xX4elnvvhq-djARbCWt6rLC7hXRaooqFx7mc-38Pnq-aqxCetswBCcDtOyCmdDgp6hSldkiQcCMS_xdCmvreoCPoyphzK98m90o284lquTiuWz369',
    deed: 'Switched to reusable containers',
    points: 85,
  },
  {
    id: 5,
    rank: 5,
    name: 'David Kim',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLpLoO3X9LUWgf_15Q8Dp3lACjbfbwIJkoDfMmbgUoZw8Ny2UiInS4agJdmO3WhPcffXbLLapijEKso_2W-Kvfqw4OdMUQWQnVdvLhlKPkxVTmHi68CEBKnGjpFL3xkogY-9_qYzFmDi7BS9ZiQPlob-U7klI9h5Ch-4-fCd2kBaTznos-Xkgo-aJ9tF7Ip-IdvvaeG2g1_IS0MyBN4juBetFv5lbva2TyZ3GaV0-2F31-XdZidgwpOjp57vkTjmkM_-d6loEGucWB',
    deed: 'Walked to school all week',
    points: 72,
  },
]

const filters = ['Newest', 'Most Praised', 'Top This Week']

export default function Feed() {
  const { user, updatePoints } = useAuth()
  const [activeFilter, setActiveFilter] = useState('Newest')
  const [likedPosts, setLikedPosts] = useState([])
  const [postText, setPostText] = useState('')
  const [postImage, setPostImage] = useState(null)
  const [isPosting, setIsPosting] = useState(false)
  const [localPosts, setLocalPosts] = useState([])
  const [topDeedsList, setTopDeedsList] = useState([])

  useEffect(() => {
    // Load posts from localStorage
    const savedPosts = JSON.parse(localStorage.getItem('ekolist_feed_posts') || '[]')
    setLocalPosts(savedPosts)
    
    // Load top deeds from localStorage (completed missions and diary entries)
    const completedMissions = JSON.parse(localStorage.getItem('ekolist_completed_missions') || '[]')
    const diaryEntries = JSON.parse(localStorage.getItem('ekolist_diary_entries') || '[]')
    
    // Combine and calculate top deeds
    const allActivities = [
      ...completedMissions.map(id => ({ type: 'mission', id, points: 50 })),
      ...diaryEntries.map(entry => ({ type: 'diary', id: entry.id, points: entry.points || 0 }))
    ]
    
    // Sort by points and get top 5
    const sorted = allActivities.sort((a, b) => b.points - a.points).slice(0, 5)
    
    // Map to topDeeds format
    const deeds = sorted.map((activity, idx) => ({
      id: activity.id,
      rank: idx + 1,
      name: user?.name || 'You',
      avatar: user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
      deed: activity.type === 'mission' ? 'Missiya tamamlandı' : 'Gündəlik qeyd',
      points: activity.points,
    }))
    
    // Merge with default topDeeds if we don't have enough
    const merged = [...deeds, ...topDeeds.slice(deeds.length)]
    setTopDeedsList(merged.slice(0, 5))
  }, [user])

  const toggleLike = (postId) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  const handlePost = async () => {
    if (!postText.trim()) {
      alert('Post məzmunu doldurulmalıdır!')
      return
    }

    setIsPosting(true)
    
    // Create new post
    const newPost = {
      id: Date.now(),
      user: {
        name: user?.name || 'You',
        avatar: user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
        school: user?.school || 'Your School',
      },
      content: postText,
      image: postImage,
      likes: 0,
      celebrations: 0,
      premium: 0,
      comments: 0,
      time: 'Just now',
      points: 10,
    }

    // Save to localStorage
    const existingPosts = JSON.parse(localStorage.getItem('ekolist_feed_posts') || '[]')
    localStorage.setItem('ekolist_feed_posts', JSON.stringify([newPost, ...existingPosts]))
    
    // Add points
    updatePoints(10)
    
    setTimeout(() => {
      setLocalPosts(prev => [newPost, ...prev])
      setPostText('')
      setPostImage(null)
      setIsPosting(false)
      alert('Post dərc olundu! +10 xal qazandınız!')
    }, 1000)
  }

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPostImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Combine posts and apply filters
  const allPosts = [...localPosts, ...feedPosts]
  
  const filteredPosts = activeFilter === 'Newest' 
    ? [...allPosts].sort((a, b) => {
        // Sort by time (newest first)
        const timeA = a.time === 'Just now' ? new Date() : new Date(a.time)
        const timeB = b.time === 'Just now' ? new Date() : new Date(b.time)
        return timeB - timeA
      })
    : activeFilter === 'Most Praised'
    ? [...allPosts].sort((a, b) => (b.likes + b.celebrations + b.premium) - (a.likes + a.celebrations + a.premium))
    : [...allPosts].filter(post => {
        // Top This Week - filter by this week
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        const postDate = post.time === 'Just now' ? new Date() : new Date(post.time)
        return postDate >= weekAgo
      }).sort((a, b) => (b.likes + b.celebrations + b.premium) - (a.likes + a.celebrations + a.premium))

  const rankColors = {
    1: 'text-amber-400',
    2: 'text-slate-400',
    3: 'text-orange-400',
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Feed */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          {/* Page Heading */}
          <h1 className="text-4xl font-black leading-tight tracking-tight text-text-light dark:text-text-dark">
            Class Feed
          </h1>

          {/* Composer */}
          <div className="card p-4">
            <div className="flex items-start gap-4">
              <img 
                src={user?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuADRN7kHOIiBd0xBrqvaDEiVKERdlMuMJRIDJWdFHdTEvkmfg7Pf8hg1PPCz4chg7UW60p21buPsncR2beLaPmADBFCfdtqYVs93niRBSgfEizcIiBTZagJYv7ak99igSiOoDUmxPvQOIFxgFPJkVLrDiy-JoZ6_Z2tIOZpOzeBHHRR05rk2JMsO3K0y1gHmorjXIHz9XFFA76nXcDMTSsNImp44ZotEEnxWi8iEGCvb1aLBtvb9xEvETnK62PqXet5HCsx-3jo7C9U'}
                alt="User avatar"
                className="w-10 h-10 rounded-full bg-primary/20 shrink-0"
              />
              <div className="flex-grow">
                <textarea 
                  className="w-full resize-none rounded-lg text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark h-24 placeholder:text-text-secondary-light/60 dark:placeholder:text-text-secondary-dark/60 text-base p-3"
                  placeholder="Share your latest eco-friendly action..."
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                />
                {postImage && (
                  <div className="mt-2 relative">
                    <img src={postImage} alt="Post" className="w-full h-32 object-cover rounded-lg" />
                    <button
                      onClick={() => setPostImage(null)}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                )}
                <div className="mt-3 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <label className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 text-blue-secondary dark:text-blue-400 transition-colors cursor-pointer">
                      <ImageIcon className="w-5 h-5" />
                      <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
                    </label>
                    <button className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 text-primary dark:text-green-400 transition-colors">
                      <MapPinIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <button 
                    onClick={handlePost}
                    disabled={isPosting || !postText.trim()}
                    className="btn-primary px-6 h-10 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPosting ? 'Posting...' : 'Post'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Chips / Filters */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-colors ${
                  activeFilter === filter
                    ? 'bg-primary/20 dark:bg-primary/30 text-primary dark:text-green-300'
                    : 'bg-card-light dark:bg-card-dark hover:bg-primary/10 dark:hover:bg-primary/20 text-text-secondary-light dark:text-text-secondary-dark'
                }`}
              >
                <p className="text-sm font-medium">{filter}</p>
              </button>
            ))}
          </div>

          {/* Feed Cards */}
          <div className="flex flex-col gap-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="card overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <img 
                      src={post.user.avatar}
                      alt={`Avatar of ${post.user.name}`}
                      className="w-10 h-10 rounded-full bg-primary/20 shrink-0"
                    />
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-text-light dark:text-text-dark">{post.user.name}</p>
                          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{post.time}</p>
                        </div>
                        <div className="flex items-center gap-1 text-primary dark:text-green-400">
                          <StarIcon className="w-4 h-4" />
                          <span className="text-sm font-bold">{post.points} pts</span>
                        </div>
                      </div>
                      <p className="mt-3 text-text-light dark:text-text-dark">{post.content}</p>
                    </div>
                  </div>
                </div>
                
                {post.image && (
                  <div 
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover"
                    style={{ backgroundImage: `url(${post.image})` }}
                  />
                )}

                <div className="flex items-center justify-between border-t border-border-light dark:border-border-dark px-5 py-3">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-2 transition-colors ${
                        likedPosts.includes(post.id) 
                          ? 'text-red-500' 
                          : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-red-500'
                      }`}
                    >
                      <HeartIcon className="w-5 h-5" filled={likedPosts.includes(post.id)} />
                      <span className="text-sm font-medium">{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                    </button>
                    <button className="flex items-center gap-2 text-blue-secondary hover:text-blue-600 transition-colors">
                      <span className="text-lg">🎉</span>
                      <span className="text-sm font-medium">{post.celebrations}</span>
                    </button>
                    <button className="flex items-center gap-2 text-primary hover:text-green-600 transition-colors">
                      <span className="text-lg">🏆</span>
                      <span className="text-sm font-medium">{post.premium}</span>
                    </button>
                  </div>
                  <button className="flex items-center gap-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-light dark:hover:text-text-dark transition-colors">
                    <MessageIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">Comment</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Top Deeds */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-24">
            <div className="card p-6">
              <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-5">
                Top 5 Good Deeds This Week
              </h3>
              <ul className="space-y-4">
                {(topDeedsList.length > 0 ? topDeedsList : topDeeds).map((deed) => (
                  <li key={deed.id} className="flex items-center gap-4">
                    <div className={`text-2xl font-black ${rankColors[deed.rank] || 'text-text-secondary-light'}`}>
                      {deed.rank}
                    </div>
                    <img 
                      src={deed.avatar}
                      alt={`Avatar of ${deed.name}`}
                      className="w-10 h-10 rounded-full bg-primary/20 shrink-0"
                    />
                    <div className="flex-grow">
                      <p className="font-semibold text-sm text-text-light dark:text-text-dark">{deed.name}</p>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{deed.deed}</p>
                    </div>
                    <div className="text-sm font-bold text-primary dark:text-green-400">{deed.points} pts</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
