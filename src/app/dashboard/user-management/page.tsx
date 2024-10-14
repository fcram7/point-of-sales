import { UserManagementList } from './UserManagementList'

const UserManagement = () => {
  return (
    <section className="user-management-section py-32 px-[4%] lg:px-[2%]">
      <div className="user-management-section__content">
        <UserManagementList />
      </div>
    </section>
  )
}

export default UserManagement;