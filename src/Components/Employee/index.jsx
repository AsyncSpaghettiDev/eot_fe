// Styles
import styles from './employee.module.css'

export const Employee = ({ empNo, empName, empLast, empRole, onClick }) => {
    // Handlers
    const onClickHandler = () => {
        onClick(empNo);
    }

    // Render section
    return (
        <tr className={`${styles.employee} ff-alter`} onClick={onClickHandler} >
            <td> {empNo?.toString().toLowerCase()} </td>
            <td> {empName?.toString().toLowerCase()} </td>
            <td> {empLast?.toString().toLowerCase()} </td>
            <td className='pady-2'> {empRole?.toString().toLowerCase()} </td>
        </tr>
    )
}
