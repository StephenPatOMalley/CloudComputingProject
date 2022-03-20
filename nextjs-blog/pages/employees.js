import Employees from '../components/Employees';
import Head from 'next/head'

export default function EmployeesPage() {
  return (
    <>
      <Head>
        <title>The Employees</title>
      </Head>
      <Employees />
    </>
  )
}
