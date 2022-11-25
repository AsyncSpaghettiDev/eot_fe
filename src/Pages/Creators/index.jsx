// Styles
import styles from './creators.module.css';

// Resources
import NotFoundImage from '../../Images/userNF.png';

// Creators
const CreatorsList = [
    {
        name: 'Jonathan Mojica',
        description: 'Programador backend, programador frontend, diseñador, QA.',
        img: 'https://iili.io/H267vrg.jpg'
    },
    {
        name: 'Felix Bojorquez Israel',
        description: 'Programador backend',
        img: 'https://iili.io/HFx3LQ9.jpg',
    },
    {
        name: 'Ponce Mejia Susan Sarahi',
        description: 'Scrum Master',
        img: 'https://iili.io/HFxqN8G.jpg',
    },
    {
        name: 'Figueroa Parra Francisco Manuel',
        description: 'Product Owner',
        img: 'https://iili.io/H2PPuCx.jpg',
    },
    {
        name: 'Vazquez Gutierrez Johan Sebastian',
        description: 'Diseñador',
        img: 'https://iili.io/H37kPhg.jpg',
    },
    {
        name: 'Magaña Navarro Kevin Yahir',
        description: 'Tester',
        img: 'https://iili.io/H2P4BP2.jpg',
    },
]

// Components
import { NavBar } from '../../Components/NavBar';

export const Creators = () => {
    document.title = `EatOnTime - Creadores`;

    return (
        <main>
            <NavBar showUser={false} />
            <h2 className={`ff-main text-center margy-1 ${styles.title}`}>
                EatOnTime development team
            </h2>
            <div className={`flex flex-wrap justify-content-center align-items-center pady-4 gap-4`}>
                {
                    CreatorsList.map((creator, index) => <Creator key={index} {...creator} />)
                }
            </div>
        </main>
    )
}

const Creator = ({ name, img, description }) => {
    return (
        <div className={`flex flex-column align-items-center gap-row-1 ${styles.member}`}>
            <img className={styles.member_image} src={img ?? NotFoundImage} alt="creator" />
            <h3 className={`ff-main ${styles.member_name}`}>{name}</h3>
            <p className={`ff-alter ${styles.member_functions}`}>{description}</p>
        </div>
    )
}