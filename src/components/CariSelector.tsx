import { useCari } from '../contexts/CariContext';
import Select from './Select';

interface CariSelectorProps {
  selectedCariId: string;
  onSelect: (cariId: string) => void;
}

const CariSelector = ({ selectedCariId, onSelect }: CariSelectorProps) => {
  const { cariList } = useCari();

  const options = [
    { value: '', label: 'Cari Seçiniz' },
    ...cariList.map(cari => ({
      value: cari.id,
      label: `${cari.kod} - ${cari.ad}`
    }))
  ];

  return (
    <Select
      label="Cari *"
      value={selectedCariId}
      onChange={(e) => onSelect(e.target.value)}
      options={options}
    />
  );
};

export default CariSelector;
