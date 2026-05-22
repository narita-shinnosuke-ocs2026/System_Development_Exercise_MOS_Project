import { Link } from 'react-router-dom'
import { MenuLayout } from '../components/MenuLayout'
import '../menu.css'

const categories = [
  { id: 'free', label: '無料備品', image: '/oshibori.png' },
  { id: 'yakitori', label: '焼き鳥', image: '/yakitori.jpg' },
  { id: 'rice', label: 'ごはんもの', image: '' },
  { id: 'speed', label: 'スピード', image: '' },
  { id: 'drink', label: 'ドリンク', image: '/beer.jpg' },
  { id: 'dessert', label: 'デザート', image: '' }
]

export default function CategoryMenu() {
  return (
    <MenuLayout activeTab="free">
      <div className="category-grid">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/menu/${category.id}`}
            className="category-card"
          >
            <div className="category-image-area">
              {category.image ? (
                <img src={category.image} alt={category.label} className="category-image" />
              ) : (
                <div className="category-image-placeholder" />
              )}
            </div>
            <div className="category-label">{category.label}</div>
          </Link>
        ))}
      </div>
    </MenuLayout>
  )
}