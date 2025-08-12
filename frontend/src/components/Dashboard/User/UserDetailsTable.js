import React, { useEffect, useState } from "react";
import {
  Table, Tbody, Tr, Td, TableContainer, ButtonGroup,
  IconButton, Flex, Editable,  EditablePreview, EditableInput,
  Button, TableCaption, useToast, useEditableControls
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { clearUpdation, putUserUpdate } from "../../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { useNotifyError, useNotifySuccess } from "../../../customHooks/useNotifyError";

export function UserDetailsTable({ user }) {
  const { loading, isUpdated, error } = useSelector((state) => state.IsUpdatedUser);

  const [userData, setUserData] = useState({
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
    city: user.city,
    nearestMetroStation: user.nearestMetroStation?.station_name,
    nearestRailStation: user.nearestRailStation?.station_name,
  });

  const dispatch = useDispatch();
  const notifyError = useNotifyError();
  const notifySuccess = useNotifySuccess();
  const navigate = useNavigate();

  const handleInputChange = (id, newValue) => {
    setUserData((prev) => ({ ...prev, [id]: newValue }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!phoneRegex.test(userData.phoneNumber)) {
      notifyError("Enter a valid phone number");
      return;
    }

    if (!emailRegex.test(userData.email)) {
      notifyError("Enter a valid email");
      return;
    }
	
    dispatch(
      putUserUpdate({
        ...userData,
        nearestMetroStation: user.nearestMetroStation?._id,
        nearestRailStation: user.nearestRailStation?._id,
      })
    );
  };

  useEffect(() => {
    if (isUpdated) {
      notifySuccess("Profile updated successfully");
      dispatch(clearUpdation());
      navigate("/profile");
    }
    if (error) {
      notifyError(error);
      dispatch(clearUpdation());
    }
  }, [isUpdated, error, dispatch, navigate, notifyError, notifySuccess]);

  function EditableField({ id, value }) {
    return (
      <Editable
        defaultValue={value}
        fontSize="1xl"
        textAlign="center"
        isPreviewFocusable={false}
        onSubmit={(newValue) => handleInputChange(id, newValue)}
      >
        <EditablePreview />
        <EditableInput />
        <EditableControls />
      </Editable>
    );
  }

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup size="sm">
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>
          <Button
            width="100%"
            isLoading={loading}
            bg="blue.400"
            color="white"
            _hover={{ bg: "blue.500" }}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </TableCaption>
        <Tbody>
          {[
            { label: "Username", id: "username" },
            { label: "Email", id: "email" },
            { label: "Phone Number", id: "phoneNumber" },
            { label: "City", id: "city" },
          ].map(({ label, id }) => (
            <Tr key={id}>
              <Td>
                <strong>{label}</strong>
              </Td>
              <Td>
                <EditableField id={id} value={userData[id]} />
              </Td>
            </Tr>
          ))}
          <Tr>
            <Td>
              <strong>Nearest Metro Station</strong>
            </Td>
            <Td textAlign="center">{userData.nearestMetroStation}</Td>
          </Tr>
          <Tr>
            <Td>
              <strong>Nearest Rail Station</strong>
            </Td>
            <Td textAlign="center">{userData.nearestRailStation}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
