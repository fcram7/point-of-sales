import { DashboardMenu } from './_components/DashboardMenu';
import { MenuSection } from './MenuSection';

const Dashboard = () => {
  return (
    <section className='dashboard-section pt-32 px-[4%] lg:px-[2%]'>
      <div className='dashboard-section__content'>
        <DashboardMenu />
        <MenuSection />
      </div>
    </section>
  );
};

export default Dashboard;
