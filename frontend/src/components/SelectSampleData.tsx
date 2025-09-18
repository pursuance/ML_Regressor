import sample_data from '@/sample_data.json' with { type: 'json'}
import { Button } from './ui/button'
import { useDataStore } from '@/store'

const SelectSampleData = () => {

  const SampleDataCard = ({ data }: { data: CSVData }) => {
    const name = data.name.replace(/_/g, " ").replace('.csv', "")

    const { setData } = useDataStore()

    const onClick = () => {
      setData(data)
    }
    
    return (
      <Button asChild variant='ghost' onClick={onClick} className='cursor-pointer'>
          <div className='flex flex-col items-center gap-1 w-30 h-30 wrap-normal border-1 rounded-md p-2 text-center'>
            { name }
            <img src="/file-csv-solid-full.svg" height={48} width={48} alt='CSV Icon' />
          </div> 
      </Button>
    )
  }

  return (
      <>
        <div>
          { sample_data.map((data, index) => 
            <SampleDataCard data={{ ...data, features: [], selectionComplete: false }} key={index} />
          )}
        </div>
      </>
    )
}

export default SelectSampleData