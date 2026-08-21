import { useEffect, useState } from "react";
import "@/styles/admin/adminDoctorRequestList.css";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import useDebounce from "@/hooks/useDebounce";
import { ClipboardList } from "lucide-react";

import DoctorLayout from "@/layout/DoctorLayout";
import Pagination from "../../components/pagination";
import type { CreateDoctorBlock, DoctorBlock } from "../types/doctorBlock";
import { fetchDoctorBlock } from "../redux/getDoctorBlock.thunk";
import { createDoctorBlockThunk } from "../redux/createDoctorBlock.thunk";
import { updateDoctorBlockThunk } from "../redux/updateDoctorBlock.thunk";
import { deleteDoctorBlockThunk } from "../redux/deleteDoctorBlock.thunk";
import DoctorBlockFilters from "../components/dcotorBlockFilter";
import DoctorBlockTable from "../components/doctorBlockTable";
import CreateDoctorBlockModal from "../components/createDoctorBlock.modal";
import UpdateDoctorBlockModal from "../components/editDoctorBlock.Modal";

const DoctorBlockPageList = () => {
  const dispatch = useAppDispatch();

  const {
    blocks,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    page,
    limit,
    totalPages,
    error,
  } = useAppSelector((state) => state.doctorBlock);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [selectedBlock, setSelectedBlock] = useState<DoctorBlock | null>(null);

  const [searchInput, setSearchInput] = useState("");

  const [date, setDate] = useState<string | undefined>(undefined);

  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    dispatch(
      fetchDoctorBlock({
        page,
        limit,
        search: debouncedSearch,
        date,
      }),
    );
  }, [dispatch, page, limit, debouncedSearch, date]);

  const handleCreateBlock = async (
    data: Omit<DoctorBlock, "id" | "doctorId" | "isDeleted">,
  ): Promise<string | null> => {
    const result = await dispatch(createDoctorBlockThunk(data));

    if (createDoctorBlockThunk.fulfilled.match(result)) {
      setIsModalOpen(false);

      return null;
    }

    return result.payload ?? "Failed to create doctor block";
  };

  const handleEditBlock = (block: DoctorBlock) => {
    setSelectedBlock(block);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateBlock = async (
    id: string,
    data: CreateDoctorBlock,
  ): Promise<string | null> => {
    const result = await dispatch(
      updateDoctorBlockThunk({
        id,
        data,
      }),
    );

    if (updateDoctorBlockThunk.fulfilled.match(result)) {
      setIsUpdateModalOpen(false);
      setSelectedBlock(null);

      return null;
    }

    return result.payload ?? "Failed to update doctor block";
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedBlock(null);
  };

  const handleDeleteBlock = async (block: DoctorBlock): Promise<void> => {
    await dispatch(deleteDoctorBlockThunk(block.id));
  };

  return (
    <DoctorLayout
      title="Doctor Blocks"
      subtitle="View and manage doctor blocks."
    >
      <div className="doctor-request-page">
        {/* INTRO */}

        <section className="doctor-request-intro">
          <div className="doctor-request-intro-icon">
            <ClipboardList size={22} />
          </div>

          <div>
            <span>BLOCK MANAGEMENT</span>

            <h2>Doctor Blocks</h2>

            <p>View doctor block requests and filter them by date or reason.</p>

            <button type="button" onClick={() => setIsModalOpen(true)}>
              Add Block
            </button>
          </div>
        </section>

        {/* FILTERS */}

        <DoctorBlockFilters
          search={searchInput}
          date={date}
          onSearchChange={setSearchInput}
          onDateChange={(value) => {
            setDate(value);
          }}
        />

        {isLoading ? (
          <div className="doctor-request-state">
            <div className="doctor-request-loader">
              <span />
              <span />
              <span />
            </div>

            <h3>Loading blocks</h3>

            <p>Fetching the latest doctor blocks.</p>
          </div>
        ) : error ? (
          <div className="doctor-request-state doctor-request-error">
            <div className="doctor-request-state-icon">!</div>

            <h3>Unable to load blocks</h3>

            <p>{error}</p>
          </div>
        ) : (
          <>
            {/* TABLE */}

            <DoctorBlockTable
              blocks={blocks}
              onEdit={handleEditBlock}
              onDelete={handleDeleteBlock}
              isDeleting={isDeleting}
            />

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(nextPage) => {
                console.log("Page:", nextPage);
              }}
            />
          </>
        )}

        <CreateDoctorBlockModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateBlock}
          isLoading={isCreating}
        />

        {/* UPDATE MODAL */}

        <UpdateDoctorBlockModal
          key={selectedBlock?.id ?? "update"}
          isOpen={isUpdateModalOpen}
          block={selectedBlock}
          onClose={handleCloseUpdateModal}
          onSubmit={handleUpdateBlock}
          isLoading={isUpdating}
        />
      </div>
    </DoctorLayout>
  );
};

export default DoctorBlockPageList;
