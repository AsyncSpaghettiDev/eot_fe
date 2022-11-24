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
    },
    {
        name: 'Ponce Mejia Susan Sarahi',
        description: 'Scrum Master',
    },
    {
        name: 'Figueroa Parra Francisco Manuel',
        description: 'Product Owner',
    },
    {
        name: 'Vazquez Gutierrez Johan Sebastian',
        description: 'Diseñador',
    },
    {
        name: 'Magaña Navarro Kevin Yahir',
        description: 'Tester',
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