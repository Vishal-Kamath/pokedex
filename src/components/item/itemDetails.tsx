import { getItemData } from '@/utils/api';
import React from 'react';

type Props = Awaited<ReturnType<typeof getItemData>>;

const ItemDetails: React.FC<Props> = ({ itemDetails }) => {
  return (
    <div className="w-full">
      <div className="mb-2 flex gap-2 border-b-4 border-black pb-2 text-2xl font-bold dark:border-white">
        <i className="text-slate-500">#{itemDetails.id}</i>
        <span>{itemDetails.name}</span>
        <div className="rounded-full bg-slate-300 px-3 py-2 text-xs text-black">
          {itemDetails.category.name}
        </div>
      </div>
      <div className="text-gray-500">
        {itemDetails.effect_entries.map((entry) => (
          <div key={entry.effect}>{entry.effect}</div>
        ))}
      </div>
      <table className="w-full border-none">
        <tbody>
          <tr>
            <td>cost:</td>
            <td>{itemDetails.cost}</td>
          </tr>
          <tr>
            <td>attributes:</td>
            <td className="flex flex-wrap gap-1">
              {itemDetails.attributes.map((attr, index) => {
                return index === 0 ? (
                  <div key={attr.name}>{attr.name}</div>
                ) : (
                  <div key={attr.name} className="flex gap-1">
                    <span>•</span> {attr.name}
                  </div>
                );
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ItemDetails;
