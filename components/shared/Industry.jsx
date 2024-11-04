import IndustryBoxes from './IndustryBoxes'

const Industry = ({ sectionDetails = true }) => {
  return (
    <section className="relative bg-white pb-150 dark:bg-dark-300 sm:overflow-hidden">
      {/* <div className="absolute left-0 right-0 top-25 h-full w-full bg-[url('/images/service-bg.png')] bg-cover bg-center bg-no-repeat opacity-70 invisible"></div> */}
      <div className="container">
        <div className="relative xl:my-40 lg:my-30 md:my-20 z-10">
          <div className="absolute left-1/2 top-1/2 -z-10 flex -translate-x-1/2  -translate-y-1/2 max-sm:hidden">
            <div className="rounded-full bg-primary-200/20 blur-[145px] lg:h-[330px] lg:w-[330px] xl:h-[442px] xl:w-[442px] "></div>
            <div className="rounded-full bg-primary-200/25 blur-[145px] lg:-ml-[170px] lg:h-[330px] lg:w-[330px] xl:h-[442px] xl:w-[442px]"></div>
            <div className="lg-ml-[170px] rounded-full bg-primary-200/20 blur-[145px] lg:h-[330px] lg:w-[330px] xl:h-[442px] xl:w-[442px]"></div>
          </div>
          <IndustryBoxes />
        </div>
      </div>
    </section>
  )
}

export default Industry
