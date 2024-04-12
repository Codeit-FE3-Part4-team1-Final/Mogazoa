interface SubjectChipInterface {
  name: string;
}

export default function SubjectChip({ name }: SubjectChipInterface) {
  return (
    <>
      <div>
        {name}
        <div>
          <div />
        </div>
      </div>
    </>
  );
}
