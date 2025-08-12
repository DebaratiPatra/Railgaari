import {
	Input,
	Box,
	UnorderedList,
	ListItem,
	Button,
	FormControl,
	FormLabel,
	useToast,
	Badge,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLRUtrains, getTrainStatus, setLRUtrains } from "../../redux/actions/trainActions";
import { useNavigate } from "react-router-dom";
import TrainInfoCard from "./TrainInfoCard.js";
import trainFile from '../../assets/trainNoList.txt';
import { Loader } from "../../utils/Loader.js";
import { useNotifyError, useNotifySuccess } from "../../customHooks/useNotifyError.js";

export default function TrainSearch() {
	const [openTrainNumbers, setOpenTrainNumbers] = useState(false);
	const [filteredTrainNumbers, setFilteredTrainNumbers] = useState([]);
	const [trainNo, setTrainNo] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const notifyError = useNotifyError();
	const notifySuccess = useNotifySuccess();
	const { loading, data, error } = useSelector((state) => state.GetTrainStatus);
	const [trainNumbers, setTrainNumbers] = useState([]);
	useEffect(() => {
		fetch(trainFile)
			.then((response) => response.text())
			.then((data) => {
				const trains = data.split("\n").map((line) => line.trim());
				setTrainNumbers(trains);
			})
			.catch((error) => console.error("Error reading file:", error));
	}, []);

	const filterTrainNumbers = (trainInput) => {
		return trainNumbers.filter((train) =>
			train.toLowerCase().startsWith(trainInput.toLowerCase())
		);
	};

	const handleTrainSelection = (train) => {
		setTrainNo(train);
		setOpenTrainNumbers(false);
	};
	useEffect(() => {
		dispatch(getLRUtrains());
	}, [])
	useEffect(() => {

		if (error === null && data && trainNo.length >= 5) {
			dispatch(setLRUtrains(trainNo));
		}
		if (error !== null) {
			notifyError(error)
			setTrainNo("");
		}
	}, [error, data]);

	const handleSearch = () => {
		if (trainNo.length < 5) {
			notifyError("Please enter valid train number");
			return;
		}
		setOpenTrainNumbers(false);
		dispatch(getTrainStatus(trainNo.slice(0, 5)));
	};

	return (
		<Box>
			<FormControl id="trainNo" mb={4}>
				<FormLabel>Train Number</FormLabel>
				<Input
					type="text"
					onChange={(e) => {
						setTrainNo(e.target.value);
						const trains = filterTrainNumbers(e.target.value);
						setFilteredTrainNumbers(trains.slice(0, 10));
						setOpenTrainNumbers(e.target.value.length > 0);
					}}
					value={trainNo}
					placeholder="Train Number"
					autoComplete="off"
				/>
				{openTrainNumbers && (
					<Box
						bg="white"
						boxShadow="md"
						border="1px solid gray"
						w="100%"
						p={2}
						mt={1}
						borderRadius="md"
						maxH="150px"
						overflowY="auto"
					>
						<UnorderedList styleType="none">
							{filteredTrainNumbers.map((train, index) => {
								const temp = train.split("-");
								return <ListItem
									key={index}
									onClick={() => handleTrainSelection(train)}
									cursor="pointer"
									p={2}
									borderRadius="md"
									_hover={{ backgroundColor: "teal.100" }}
									_active={{ backgroundColor: "teal.200" }}
								>
									<Badge colorScheme='blue'>{temp[0]}</Badge> {temp[1]}
								</ListItem>
								})}
						</UnorderedList>
					</Box>
				)}
			</FormControl>

			<Button
				isLoading={loading ? true : false}
				w="100%"
				colorScheme="teal"
				onClick={handleSearch}
			>
				Search
			</Button>
			{data && data.data && <TrainInfoCard data={data.data} />}
		</Box>
	);
}
