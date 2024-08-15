/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable no-param-reassign */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactFlow, { ReactFlowProvider } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useFormik } from 'formik';

import useStore from './store';

import 'reactflow/dist/style.css';

import Header from '../CommVoiceAdmin/components/Header';

import '../../styles/scss/components/subhead.scss';
import '../../styles/scss/pages/call-flow-hours.scss';
import '../../styles/formvalidation.css';

import IncomingCall from '../CommVoiceAdmin/components/nodes/IncomingCall';
import Start from '../CommVoiceAdmin/components/nodes/Start';
import Greetify from '../CommVoiceAdmin/components/nodes/Greetify';
import ComponentSelectPopup from '../CommVoiceAdmin/components/modals/ComponentSelectPopup';
import IVRMenu from '../CommVoiceAdmin/components/nodes/IVRMenu';
import Connect from '../CommVoiceAdmin/components/nodes/Connect';
import Hours from '../CommVoiceAdmin/components/nodes/Hours';
import VoiceMail from '../CommVoiceAdmin/components/nodes/VoiceMail';

import Email from '../CommVoiceAdmin/components/nodes/Email';
import CallerID from '../CommVoiceAdmin/components/nodes/CallerID';
import Shortcut from '../CommVoiceAdmin/components/nodes/Shortcut';
import CallerList from '../CommVoiceAdmin/components/nodes/CallerList';
import GetValue from '../CommVoiceAdmin/components/nodes/GetValue';
import PassThru from '../CommVoiceAdmin/components/nodes/PassThru';
import SMS from '../CommVoiceAdmin/components/nodes/SMS';
import SendSMS from '../CommVoiceAdmin/components/nodes/SendSMS';
import Queue from '../CommVoiceAdmin/components/nodes/Queue';
import HangUp from '../CommVoiceAdmin/components/nodes/HangUp';
import GoToFlow from '../CommVoiceAdmin/components/nodes/GoToFlow';
import CallBack from '../CommVoiceAdmin/components/nodes/CallBack';

import HoursModal from '../CommVoiceAdmin/components/modals/HoursModal';
import GreetifyModal from '../CommVoiceAdmin/components/modals/GreetifyModal';
import IVRMenuModal from '../CommVoiceAdmin/components/modals/IVRMenuModal';
import ConnectModal from '../CommVoiceAdmin/components/modals/ConnectModal';
import VoiceMailModal from '../CommVoiceAdmin/components/modals/VoiceMailModal';
import EmailModal from '../CommVoiceAdmin/components/modals/EmailModal';
import CallerListModal from '../CommVoiceAdmin/components/modals/CallerListModal';
import PassThruModal from '../CommVoiceAdmin/components/modals/PassThruModal';
import SMSModal from '../CommVoiceAdmin/components/modals/SMSModal';
import SendSMSModal from '../CommVoiceAdmin/components/modals/SendSMSModal';
import QueueModal from '../CommVoiceAdmin/components/modals/QueueModal';
import HangUpModal from '../CommVoiceAdmin/components/modals/HangUpModal';
import GoToFlowModal from '../CommVoiceAdmin/components/modals/GoToFlowModal';
import CallBackModal from '../CommVoiceAdmin/components/modals/CallBackModal';
import { ListVoiceCategory } from '../../common/api-collection/Telephony/VoiceCategory';
import ShortcutModal from '../CommVoiceAdmin/components/modals/ShortcutModal';
import CallerIdModal from '../CommVoiceAdmin/components/modals/CallerIdModal';
import DeleteModal from '../CommVoiceAdmin/components/modals/DeleteModal';
import {
  GetCallFlow,
  ListCallFlowsListWithoutPagination,
  PublishCallFlow,
  UnpublishCallFlow,
  UpdateCallFlow,
} from '../../common/api-collection/Telephony/CallFlow';
import ToastSuccess from '../../common/components/toast/ToastSucess';
import ToastError from '../../common/components/toast/ToastError';
import SpinningLoader from '../../common/components/Loader/SpinningLoader';
import { ListAllVoiceLibrary } from '../../common/api-collection/Telephony/VoiceLibrary';
import PublishFlowModal from '../CommVoiceAdmin/components/flow/PublishFlowModal';
import UnpublishFlowModal from '../CommVoiceAdmin/components/flow/UnpublishFlowModal';
import TestFlowModal from './TestFlowModal';
import { ListAgents } from '../../common/api-collection/TenantAdmin/Agents';
import { ListDepartments } from '../../common/api-collection/Department';
import { ListAllApiLibrary } from '../../common/api-collection/Telephony/ApiLibrary';
import { ListCallerList } from '../../common/api-collection/Telephony/CallerList';
import { ListAllTemplates } from '../../common/api-collection/Telephony/Templates';
import { ListAgentAvailabilitiesWithoutPagination } from '../../common/api-collection/Telephony/AgentAvailability';
import { ListAllComponents } from '../../common/api-collection/Telephony/Components';
import GetValueModalNew from '../CommVoiceAdmin/components/modals/GetValueModalNew';
import CommonModal from '../../common/components/modals/CommonModal';
import Layout from '../../common/Layout';

function Test() {
  const style1 = {
    display: 'none',
    width: '100%',
    height: '100%',
  };

  const edgeAttributes = { type: '', color: '' };

  let message = '';
  let flowType = {};

  const params = useParams();
  const keyRef = useRef();

  const audioRef = useRef();
  const divRef = useRef(null);

  const {
    setFlowEdges,
    setActiveNodeId,
    setActiveNodeType,
    componentPlayingDetails,
    activeNodeId,
    setFlow,
    show,
    setShow,
    selectedEdge,
    setSelectedEdge,
    selectedNode,
    addToActiveNode,
    setActiveVoiceUrl,
    setActiveNodeDetails,
    setCallerListArray,
    nodeSelectedForDelete,
    setNodeSelectedForDelete,
  } = useStore();

  const [search, setSearch] = useState('');
  const [componentsloading, setComponentsloading] = useState(false);
  const [availableIVRMenus, setAvailableIVRMenus] = useState([]);

  const [refreshCallFlowDetails, setRefreshCallFlowDetails] = useState(false);

  const voiceCategoryList = useQuery({
    queryKey: ['voiceCategoryList'],
    queryFn: () => ListVoiceCategory(),
  });

  const agentAvailabilities = useQuery({
    queryKey: ['agentAvailabilities'],
    queryFn: () => ListAgentAvailabilitiesWithoutPagination(),
  });

  const [callFlowDetails, setCallFlowDetails] = useState();

  const [toastAction, setToastAction] = useState({
    isVisible: false,
    type: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [loadingCallFlowDetails, setLoadingCallFlowDetails] = useState(true);

  const [selectedVoice, setSelectedVoice] = useState({
    id: 'select',
    parentType: '',
    url: '',
    isVoicePalying: false,
  });

  const [active, setActive] = useState({
    state: true,
    type: '',
    categoryName: '',
    categoryId: '5',
    fileName: '',
    fileId: 1,
  });

  const [categoriesList, setCategoriesList] = useState([]);
  const [categoriesListSearchResult, setCategoriesListSearchResult] = useState(
    []
  );

  const [allAvailableVoices, setAllAvailableVoices] = useState([]);

  const [voiceLibraryList, setVoiceLibraryList] = useState([]);

  const [lengthOfCallFlow, setLengthOfCallFlow] = useState(2);

  const [customEdges, setCustomEdges] = useState([
    {
      id: 'incoming-call',
      source: 'incomingCall',
      sourceHandle: 'incomingCall',
      target: 'node-2',
      type: edgeAttributes.type,
      style: { stroke: edgeAttributes.color },
    },
  ]);

  const [customNodes, setCustomNodes] = useState([
    {
      id: 'incomingCall',
      position: {
        x: 0,
        y: 0,
      },
      type: 'incomingCall',
      data: {
        label: 'Incoming Call',
      },
      width: 300,
      height: 47,
      x: 177,
      y: 23.5,
      rank: 0,
      draggable: true,
    },
    {
      id: 'node-2',
      position: {
        x: 0,
        y: 100,
      },
      type: 'start',
      data: {
        label: 'Start',
      },
      width: 354,
      height: 155,
      x: 177,
      y: 174.5,
      rank: 0,
      draggable: true,
      selected: true,
      dragging: false,
    },
  ]);

  const [isDataSubmiting, setIsDataSubmiting] = useState(false);

  const [agents, setAgents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [apiLibraries, setApiLibraries] = useState([]);
  const [callFlows, setCallFlows] = useState([]);
  const [callerList, setCallerList] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [iVRSearchResult, setIVRSearchResult] = useState([]);

  const [vendorComponents, setVendorComponents] = useState([]);

  const SMSSenderID = [
    { id: 1, label: 'SND6453627' },
    { id: 2, label: 'SND6455628' },
    { id: 3, label: 'SND6251629' },
  ];

  const handleUpdateCallFlow = (updatedArray, type, result) => {
    if (type === 'connect') {
      message = 'Action connected successfully';
    } else if (type === 'edge-delete') {
      message = 'Connection Delete successfully';
    } else if (type === 'add-node') {
      message = 'Action Added successfully';
    } else if (type === 'node-delete') {
      message = 'Action Delete successfully';
    } else if (type === 'node-moved') {
      message = 'Saved';
    } else if (type === 'node-update') {
      message = 'Action updated';
    }

    // actions corresponds to `nodes` in react-flow
    // connections corresponds to `edges` in react-flow
    if (type === 'edge-delete') {
      const arr = updatedArray.map((edge) => ({
        ...edge,
        style: { stroke: edgeAttributes?.color },
      }));

      flowType = { actions: keyRef?.current?.customNodes, connections: arr };
    } else if (type === 'node-delete') {
      const arr = result.map((edge) => ({
        ...edge,
        style: { stroke: edgeAttributes?.color },
      }));
      flowType = { actions: updatedArray, connections: arr };
    } else if (type === 'connect') {
      const arr = updatedArray.map((edge) => ({
        ...edge,
        style: { stroke: edgeAttributes?.color },
      }));
      flowType = { actions: customNodes, connections: arr };
    } else if (type === 'add-node') {
      const arr = updatedArray.map((edge) => ({
        ...edge,
        style: { stroke: edgeAttributes?.color },
      }));
      flowType = { actions: customNodes, connections: arr };
    } else if (type === 'node-moved') {
      const arr = updatedArray.map((edge) => ({
        ...edge,
        style: { stroke: edgeAttributes?.color },
      }));
      flowType = { actions: customNodes, connections: arr };
    } else if (type === 'node-update') {
      const arr = customEdges.map((edge) => ({
        ...edge,
        style: { stroke: edgeAttributes?.color },
      }));
      flowType = { actions: updatedArray, connections: arr };
    }

    const data = {
      type: 'telephony_call-flow',

      id: params?.id,
      attributes: {
        name: keyRef?.current?.callFlowName,
        flow: flowType,
      },
    };

    setIsDataSubmiting(true);
    if (keyRef?.current?.callFlowName) {
      UpdateCallFlow(data, params?.id)
        ?.then(() => {
          // setRefreshCallFlowDetails(!refreshCallFlowDetails);
          setToastAction({
            isVisible: true,
            type: 'success',
            message,
          });
        })
        .catch(() => {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: 'Something went wrong.',
          });
        })
        .finally(() => {
          setIsDataSubmiting(false);
          setShow({ isVisible: false, type: '' });
          setNodeSelectedForDelete({ isVisible: false, nodeId: '', type: '' });
        });
    }
  };

  const handlePublishCallFlow = () => {
    setLoading(true);
    PublishCallFlow(params?.id)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Flow has been published successfully.',
        });
        setRefreshCallFlowDetails(!refreshCallFlowDetails);
      })
      .catch((error) => {
        if (error?.response?.status === 500) {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: 'Something went wrong.',
          });
        } else {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.error?.message,
          });
        }
      })
      .finally(() => {
        setLoading(false);
        setShow({
          isVisible: false,
          type: '',
        });
      });
  };

  const handleUnPublishCallFlow = () => {
    setLoading(true);
    UnpublishCallFlow(params?.id)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Flow has been Unpublished successfully.',
        });
        setRefreshCallFlowDetails(!refreshCallFlowDetails);
      })
      .catch((error) => {
        if (error?.response?.status === 500) {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: 'Something went wrong.',
          });
        } else {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.error?.message,
          });
        }
      })
      .finally(() => {
        setLoading(false);
        setShow({
          isVisible: false,
          type: '',
        });
      });
  };

  const onPause = (id, parentType, url, isVoicePalying) => {
    audioRef.current.currentTime = 0;
    audioRef.current.pause();
    setSelectedVoice({
      id,
      parentType,
      url,
      isVoicePalying,
    });
  };

  const togglePlay = (id, parentType, url, isVoicePalying) => {
    audioRef.current.src = url;
    audioRef.current.src = url;
    setSelectedVoice({
      id,
      parentType,
      url,
      isVoicePalying,
    });

    audioRef?.current?.play();
  };

  const resetAudio = () => {
    setSelectedVoice({
      id: 'select',
      parentType: '',
      url: '',
      isVoicePalying: false,
    });
    audioRef.current.currentTime = 0;
    audioRef.current.pause();
  };

  const removeItemFromCutomNodes = (idToRemove) => {
    setCustomNodes((prevArray) =>
      prevArray.filter((item) => item.id !== idToRemove)
    );
  };

  const removeItemFromCutomEdges = (idToRemove) => {
    setCustomEdges((prevArray) =>
      prevArray.filter((item) => item.id !== idToRemove)
    );
  };

  const customNodeTypes = useMemo(
    () => ({
      start: Start,
      incomingCall: IncomingCall,

      greetify: Greetify,
      'ivr-menu': IVRMenu,
      connect: Connect,

      hours: Hours,
      'voice-mail': VoiceMail,
      email: Email,

      'caller-id': CallerID,
      'caller-list': CallerList,
      shortcut: Shortcut,

      'get-value': GetValue,
      'pass-through': PassThru,
      sms: SMS,

      'send-sms': SendSMS,
      queue: Queue,
      'hang-up': HangUp,

      'go-to-flow': GoToFlow,
      callback: CallBack,
    }),
    []
  );

  const getEdges = (nodeId) => {
    if (nodeId) {
      const result = customEdges.filter((edge) => edge.source === nodeId);
      return result;
    }
    return [];
  };

  const getNode = (nodeId) => {
    if (nodeId) {
      const result = customNodes.filter((node) => node.id === nodeId);
      return result;
    }
    return [];
  };

  const getX = () => {
    const edges = getEdges(selectedNode.nodeId);
    const node = getNode(edges[edges.length - 1]?.source)[0];
    if (node?.position?.x) {
      return node.position.x + 400;
    }

    if (customNodes[customNodes.length - 1]?.position?.x) {
      return customNodes[customNodes.length - 1].position.x + 400;
    }
    return 400;
  };

  const getY = () => {
    const edges = getEdges(selectedNode.nodeId);
    const node = getNode(edges[edges.length - 1]?.target)[0];

    // console.log('node : ', node);

    if (node?.position?.y && node?.height) {
      return node.position.y + node.height + 100;
    }

    if (node?.position?.y) {
      return node.position.y + 150;
    }

    return 150;
  };

  const handleUpdateNode = async (data) => {
    const updatedNodes = await customNodes.map((node) => {
      if (String(node?.id) === String(data?.nodeId)) {
        return {
          ...node,
          details: data?.details,
        };
      }
      return node;
    });
    setCustomNodes(updatedNodes);
    handleUpdateCallFlow(updatedNodes, 'node-update');
  };

  const onConnect = (e) => {
    const id = uuidv4();

    setCustomEdges((prevArray) => {
      const updatedArray = [
        ...prevArray,
        {
          id: `edge-${id}`,
          source: e?.source,
          sourceHandle: e?.sourceHandle,
          target: e?.target,
          targetHandle: e?.targetHandle,
          targetType: e?.targetHandle?.split(':')[0],
          type: edgeAttributes.type,
          style: { stroke: edgeAttributes.color },
        },
      ];
      handleUpdateCallFlow(updatedArray, 'connect');
      return updatedArray;
    });
  };

  const handleAddComponent = (data) => {
    if (data.prevNodeId === 'node-2') {
      data.prevNodeId = 'incomingCall';
    }
    const id = uuidv4();

    if (customNodes[1]?.id === 'node-2') {
      removeItemFromCutomNodes('node-2');
      removeItemFromCutomEdges('edge-1');
    }

    if (data?.type === 'greetify') {
      setCustomNodes((prevArray) => [
        ...prevArray,
        {
          id,
          prevNodeId: 'incomingCall',
          prevHandleId: data.prevHandleId,
          position: {
            x: getX(lengthOfCallFlow),
            y: getY(lengthOfCallFlow),
          },
          type: 'greetify',
          data: {
            label: 'Greetify',
          },
          details: data.details,
          x: 500,
          y: 55,
          rank: 2,
          width: 300,
          height: 110,
          draggable: true,
        },
      ]);
    } else if (data?.type === 'ivr-menu') {
      setCustomNodes((prevArray) => [
        ...prevArray,
        {
          id,
          prevNodeId: data.prevNodeId,
          prevHandleId: data.prevHandleId,
          position: {
            x: getX(lengthOfCallFlow),
            y: getY(lengthOfCallFlow),
          },
          type: 'ivr-menu',
          data: {
            label: 'IVR Menu',
          },
          details: data.details,
          width: 300,
          x: 850,
          y: 74.5,
          rank: 4,
          // height: 149,
          height: 171,
          draggable: true,
          name: `IVR Menu-${availableIVRMenus.length + 1}`,
        },
      ]);
    } else if (data?.type === 'connect') {
      setCustomNodes((prevArray) => [
        ...prevArray,
        {
          id,
          prevNodeId: data.prevNodeId,
          prevHandleId: data.prevHandleId,
          position: {
            x: getX(lengthOfCallFlow),
            y: getY(lengthOfCallFlow),
          },
          type: 'connect',
          data: {
            label: 'Connect',
          },
          details: data.details,
          width: 300,
          x: 1200,
          y: 148,
          rank: 6,
          height: 296,
          draggable: true,
        },
      ]);
    } else if (data?.type === 'hours') {
      setCustomNodes((prevArray) => [
        ...prevArray,
        {
          id,
          prevNodeId: data.prevNodeId,
          prevHandleId: data.prevHandleId,
          position: {
            x: getX(lengthOfCallFlow),
            y: getY(lengthOfCallFlow),
          },
          type: 'hours',
          data: {
            label: 'Hours',
          },
          details: data.details,
          width: 300,
          x: 500,
          y: 76,
          rank: 2,
          height: 152,
          draggable: true,
        },
      ]);
    } else if (data?.type === 'voicemail') {
      setCustomNodes((prevArray) => [
        ...prevArray,
        {
          id,
          prevNodeId: data.prevNodeId,
          prevHandleId: data.prevHandleId,
          position: {
            x: getX(lengthOfCallFlow),
            y: getY(lengthOfCallFlow),
          },
          type: 'voice-mail',
          data: {
            label: 'Voice Mail',
          },
          details: {
            voiceId: data?.details?.voiceId,
            voiceMailTarget: data?.details?.voiceMailTarget,
            departmentId: data?.details?.departmentId,
            agentId: data?.details?.agentId,
            endKey: data?.details?.endKey,
            duration: data?.details?.duration,
            endOnSilenceDuration: data?.details?.endOnSilenceDuration,
          },
          width: 300,
          x: 150,
          y: 55,
          rank: 0,
          height: 112,
          draggable: true,
        },
      ]);
    } else if (data?.type === 'email') {
      setCustomNodes((prevArray) => [
        ...prevArray,
        {
          id,
          prevNodeId: data.prevNodeId,
          prevHandleId: data.prevHandleId,
          position: {
            x: getX(lengthOfCallFlow),
            y: getY(lengthOfCallFlow),
          },
          type: 'email',
          data: {
            label: 'Email',
          },
          details: data.details,
          width: 300,
          x: 150,
          y: 183.5,
          rank: 0,
          height: 110,
          draggable: true,
        },
      ]);
    } else if (data?.type === 'caller-id') {
      setCustomNodes((prevArray) => [
        ...prevArray,
        {
          id,
          prevNodeId: data.prevNodeId,
          prevHandleId: data.prevHandleId,
          position: {
            x: getX(lengthOfCallFlow),
            y: getY(lengthOfCallFlow),
          },
          type: 'caller-id',
          data: {
            label: 'Caller ID',
          },
          details: data.details,
          width: 300,
          x: 500,
          y: 117.5,
          rank: 2,
          height: 235,
          draggable: true,
        },
      ]);
    } else if (data?.type === 'caller-list') {
      setCustomNodes((prevArray) => [
        ...prevArray,
        {
          id,
          prevNodeId: data.prevNodeId,
          prevHandleId: data.prevHandleId,
          position: {
            x: getX(lengthOfCallFlow),
            y: getY(lengthOfCallFlow),
          },
          type: 'caller-list',
          data: {
            label: 'Caller List',
          },
          details: data.details,
          width: 300,
          x: 500,
          y: 55,
          rank: 2,
          height: 110,
          draggable: true,
        },
      ]);
    } else if (data?.type === 'shortcut') {
      setCustomNodes((prevArray) => [
        ...prevArray,
        {
          id,
          prevNodeId: data.prevNodeId,
          prevHandleId: data.prevHandleId,
          position: {
            x: getX(lengthOfCallFlow),
            y: getY(lengthOfCallFlow),
          },
          type: 'shortcut',
          data: {
            label: 'Shortcut',
          },
          details: data.details,
          width: 300,
          x: 500,
          y: 173,
          rank: 2,
          height: 346,
          draggable: true,
        },
      ]);
    } else if (data?.type === 'get-value') {
      setCustomNodes((prevArray) => [
        ...prevArray,
        {
          id,
          prevNodeId: data.prevNodeId,
          prevHandleId: data.prevHandleId,
          position: {
            x: getX(lengthOfCallFlow),
            y: getY(lengthOfCallFlow),
          },
          type: 'get-value',
          data: {
            label: 'Get Value',
          },
          details: data.details,
          width: 300,
          x: 150,
          y: 114.5,
          rank: 0,
          height: 229,
          draggable: true,
        },
      ]);
    } else if (data?.type === 'passthru') {
      setCustomNodes((prevArray) => [
        ...prevArray,
        {
          id,
          prevNodeId: data.prevNodeId,
          prevHandleId: data.prevHandleId,
          position: {
            x: getX(lengthOfCallFlow),
            y: getY(lengthOfCallFlow),
          },
          type: 'pass-through',
          data: {
            label: 'Passthru',
          },
          details: data.details,
          width: 300,
          x: 500,
          y: 75,
          rank: 2,
          height: 150,
          draggable: true,
        },
      ]);
    } else if (data?.type === 'sms') {
      setCustomNodes((prevArray) => [
        ...prevArray,
        {
          id,
          prevNodeId: data.prevNodeId,
          prevHandleId: data.prevHandleId,
          position: {
            x: getX(lengthOfCallFlow),
            y: getY(lengthOfCallFlow),
          },
          type: 'sms',
          data: {
            label: 'SMS',
          },
          details: data.details,
          width: 300,
          x: 500,
          y: 55,
          rank: 2,
          height: 110,
          draggable: true,
        },
      ]);
    } else if (data?.type === 'send-sms') {
      setCustomNodes((prevArray) => [
        ...prevArray,
        {
          id,
          prevNodeId: data.prevNodeId,
          prevHandleId: data.prevHandleId,
          position: {
            x: getX(lengthOfCallFlow),
            y: getY(lengthOfCallFlow),
          },
          type: 'send-sms',
          data: {
            label: '"Send SMS"',
          },
          details: data.details,
          width: 300,
          x: 500,
          y: 55,
          rank: 2,
          height: 110,
          draggable: true,
        },
      ]);
    } else if (data?.type === 'queue') {
      setCustomNodes((prevArray) => [
        ...prevArray,
        {
          id,
          prevNodeId: data.prevNodeId,
          prevHandleId: data.prevHandleId,
          position: {
            x: getX(lengthOfCallFlow),
            y: getY(lengthOfCallFlow),
          },
          type: 'queue',
          data: {
            label: 'Queue',
          },
          details: data.details,
          width: 300,
          x: 500,
          y: 116.5,
          rank: 2,
          height: 223,
          draggable: true,
        },
      ]);
    } else if (data?.type === 'hang-up') {
      setCustomNodes((prevArray) => [
        ...prevArray,
        {
          id,
          prevNodeId: data.prevNodeId,
          prevHandleId: data.prevHandleId,
          position: {
            x: getX(lengthOfCallFlow),
            y: getY(lengthOfCallFlow),
          },
          type: 'hang-up',
          data: {
            label: 'Hang Up',
          },
          details: data.details,
          width: 300,
          x: 500,
          y: 88.5,
          rank: 2,
          height: 55,
          draggable: true,
        },
      ]);
    } else if (data?.type === 'goto-flow') {
      setCustomNodes((prevArray) => [
        ...prevArray,
        {
          id,
          prevNodeId: data.prevNodeId,
          prevHandleId: data.prevHandleId,
          position: {
            x: getX(lengthOfCallFlow),
            y: getY(lengthOfCallFlow),
          },
          type: 'go-to-flow',
          data: {
            label: 'Go To Flow',
          },
          details: data.details,
          width: 300,
          x: 500,
          y: 24,
          rank: 2,
          height: 48,
          draggable: true,
        },
      ]);
    } else if (data?.type === 'callBack') {
      setCustomNodes((prevArray) => [
        ...prevArray,
        {
          id,
          prevNodeId: data.prevNodeId,
          prevHandleId: data.prevHandleId,
          position: {
            x: getX(lengthOfCallFlow),
            y: getY(lengthOfCallFlow),
          },
          type: 'callback',
          data: {
            label: 'Callback',
          },
          details: data.details,
          width: 500,
          x: 500,
          y: 55,
          rank: 2,
          height: 110,
          draggable: true,
        },
      ]);
    }
    //

    resetAudio();
    setLoading(false);
    setShow({
      isVisible: true,
      type: data?.type,
      prevNodeId: data?.prevNodeId,
      prevHandleId: data?.prevHandleId,
      targetType: show?.targetType,
      id,
    });

    data?.formik.resetForm();
  };

  const handleDeleteEdge = (idToRemove) => {
    if (keyRef?.current) {
      setCustomEdges((prevArray) => {
        const updatedArray = prevArray.filter((edge) => edge.id !== idToRemove);
        handleUpdateCallFlow(updatedArray, 'edge-delete');
        return updatedArray;
      });
    }
  };

  const handleDeleteNode = (idToRemove) => {
    if (keyRef?.current) {
      setCustomNodes((prevArray) => {
        const updatedArray = prevArray.filter((node) => node.id !== idToRemove);
        if (
          updatedArray?.length === 1 &&
          updatedArray[0]?.id === 'incomingCall'
        ) {
          updatedArray.push({
            id: 'node-2',
            position: {
              x: 0,
              y: 100,
            },
            type: 'start',
            data: {
              label: 'Start',
            },
            width: 354,
            height: 155,
            x: 177,
            y: 174.5,
            rank: 0,
            draggable: true,
            selected: true,
            dragging: false,
          });
          setShow({
            isVisible: false,
            type: ' ',
            prevNodeId: ' ',
          });
          setCustomEdges([
            {
              id: 'edge-1',
              source: 'incomingCall',
              target: 'node-2',
              type: edgeAttributes.type,
              style: { stroke: edgeAttributes.color },
            },
          ]);
        }
        // ------------------------
        const edgeAsSource = customEdges.filter(
          (edge) => edge.source === idToRemove
        );
        const edgeAsTarget = customEdges.filter(
          (edge) => edge.target === idToRemove
        );

        const result = customEdges.filter(
          (item) => !edgeAsSource.includes(item)
        );
        const xxx = result.filter((item) => !edgeAsTarget.includes(item));
        // ------------------------

        handleUpdateCallFlow(updatedArray, 'node-delete', xxx);
        return updatedArray;
      });
    }
    setNodeSelectedForDelete({ isVisible: false, nodeId: '', type: '' });
  };

  const handleDeleteComponent = () => {
    if (keyRef?.current?.type === 'edge') {
      handleDeleteEdge(keyRef?.current?.id);
    }
    if (keyRef?.current?.type === 'node') {
      handleDeleteNode(keyRef?.current?.id);
    }
  };

  const onEdgeClick = (event, edge) => {
    setSelectedEdge(edge);
    keyRef.current = {
      type: 'edge',
      id: edge.id,
      callFlowName: callFlowDetails?.attributes?.name,
      customNodes,
    };
  };

  const onNodeDragStop = (event, node) => {
    const updatedNodes = customNodes.map((n) => {
      if (n.id === node.id) {
        if (
          node.position.x !== n.position.x ||
          node.position.y !== n.position.y
        ) {
          // Node has been dragged, perform your actions here
          setShow({ type: 'node-moved' });
        }
        return {
          ...n,
          position: { x: node.position.x, y: node.position.y },
        };
      }
      return n;
    });
    setCustomNodes(updatedNodes);
  };

  const handleKeyDownDelete = (event) => {
    // Check if the pressed key is the delete key
    if (event.key === 'Delete' || event.key === 'Del') {
      // Handle delete key press
      handleDeleteComponent();
    }
  };

  const validate = (data) => {
    const errors = {};

    if (!data.callFlowName) {
      errors.callFlowName = 'required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      isEditing: false,
      callFlowName: '',
    },
    validate,
    onSubmit: () => {
      const data = {
        type: 'telephony_call-flow',
        id: params?.id,
        attributes: {
          name: formik.values.callFlowName,
          flow: {
            // This corresponds to `nodes` in react-flow
            actions: customNodes,
            // This corresponds to `edges` in react-flow
            connections: customEdges,
          },
        },
      };

      setLoading(true);
      UpdateCallFlow(data, params?.id)
        ?.then(() => {
          setToastAction({
            isVisible: true,
            type: 'success',
            message: 'Call flow name has been changed successfully',
          });
          setRefreshCallFlowDetails(!refreshCallFlowDetails);
        })
        .catch(() => {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: 'Something went wrong.',
          });
        })
        .finally(() => {
          formik.resetForm();
          setLoading(false);
        });
    },
  });

  const getVoiceURL = (voiceId) => {
    if (voiceId) {
      const result = allAvailableVoices.filter((voice) => voice.id === voiceId);
      return result[0]?.attributes?.voice_file_media_url;
    }
    return null;
  };

  const handleListVoiceLibrary = () => {
    ListAllVoiceLibrary()?.then((response) => {
      setAllAvailableVoices(response?.data);
    });
  };

  const handleListVendorComponents = () => {
    setComponentsloading(true);
    ListAllComponents(search)
      ?.then((response) => {
        setVendorComponents(response?.data);
      })
      .finally(() => {
        setComponentsloading(false);
      });
  };

  const handleIVRSearch = (key) => {
    const matchingNames = availableIVRMenus?.filter((ivr) => {
      const name = ivr?.name;
      if (name?.toLowerCase().includes(key.toLowerCase())) {
        return name;
      }
      return '';
    });
    setIVRSearchResult(matchingNames);
  };

  const handleSelectIVR = (targetNodeId) => {
    const id = uuidv4();
    setCustomEdges((prevArray) => {
      const updatedArray = [
        ...prevArray,
        {
          id: `edge-${id}`,
          source: show?.prevNodeId,
          sourceHandle: `${show?.targetType}:source:${show?.prevNodeId}`,
          target: targetNodeId,
          targetHandle: `ivr-menu-2:target:${targetNodeId}`,
          targetType: 'ivr-menu-2',
          type: edgeAttributes.type,
          style: { stroke: edgeAttributes.color },
        },
      ];
      handleUpdateCallFlow(updatedArray, 'connect');
      return updatedArray;
    });
  };

  const handleDeleteComponentNode = () => {
    handleDeleteNode(nodeSelectedForDelete?.nodeId);
  };

  const handleRemoveConnections = () => {
    if (nodeSelectedForDelete?.nodeId) {
      const edgeAsSource = customEdges.filter(
        (edge) => edge.source === nodeSelectedForDelete?.nodeId
      );
      const result =
        edgeAsSource?.length > 0
          ? edgeAsSource.filter(
              (edge) => edge.targetType === selectedNode?.type
            )
          : [];

      if (result[0]?.id) {
        handleDeleteEdge(result[0]?.id);
      } else {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: 'Select a connection',
        });
        setNodeSelectedForDelete({ isVisible: false, nodeId: '', type: '' });
      }
    }
  };

  useEffect(() => {
    setFlow(customNodes);
    setLengthOfCallFlow(customNodes?.length);
    setAvailableIVRMenus([]);

    const id = uuidv4();
    if (
      show?.prevNodeId &&
      show?.prevNodeId !== 'node-2' &&
      show?.prevNodeId !== 'incomingCall'
    ) {
      // To use the updated state immediately after the update
      setCustomEdges((prevArray) => {
        const updatedArray = [
          ...prevArray,
          {
            id: `edge-${id}`,
            source: show?.prevNodeId,
            sourceHandle: `${show?.targetType}:source:${show?.prevNodeId}`,
            target: customNodes[customNodes.length - 1]?.id,
            targetHandle: `${show?.type}:target:${
              customNodes[customNodes.length - 1]?.id
            }`,
            targetType: show?.targetType,
            type: edgeAttributes.type,
            style: { stroke: edgeAttributes.color },
          },
        ];
        handleUpdateCallFlow(updatedArray, 'add-node');

        return updatedArray;
      });
    } else if (show?.prevNodeId && show?.prevNodeId === 'incomingCall') {
      // To use the updated state immediately after the update

      setCustomEdges(() => {
        const updatedArray = [
          // ...prevArray,
          {
            id: `edge-${id}`,
            source: 'incomingCall',
            sourceHandle: 'incomingCall',
            target: customNodes[customNodes.length - 1]?.id,
            targetHandle: `${show?.type}:target:${
              customNodes[customNodes.length - 1]?.id
            }`,
            targetType: show?.targetType,
            type: edgeAttributes.type,
            style: { stroke: edgeAttributes.color },
          },
        ];
        handleUpdateCallFlow(updatedArray, 'add-node');
        return updatedArray;
      });
    } else if (show?.type === 'node-moved') {
      handleUpdateCallFlow(customEdges, 'node-moved');
    }

    if (customNodes?.length > 0) {
      customNodes?.map((node) => {
        if (node?.type === 'ivr-menu') {
          setAvailableIVRMenus((prevArray) => [...prevArray, node]);
        }
        return null;
      });
    }
  }, [customNodes]);

  useEffect(() => {
    setFlowEdges(customEdges);
  }, [customEdges]);

  useEffect(() => {
    if (active?.categoryName) {
      const matchingCategories = categoriesList.filter((category) => {
        const { name } = category.attributes;
        const match = active?.categoryName;
        return name?.toLowerCase().includes(match?.toLowerCase());
      });

      setCategoriesListSearchResult(matchingCategories);
    } else {
      setCategoriesListSearchResult(categoriesList);
    }
  }, [active?.categoryName, categoriesList]);

  useEffect(() => {
    if (active?.categoryId) {
      setLoading(true);

      ListAllVoiceLibrary(active?.fileName, active?.categoryId)
        ?.then((response) => {
          setVoiceLibraryList(response?.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [active?.categoryId, active?.fileName]);

  useEffect(() => {
    handleListVoiceLibrary();
    // Attach the event listener when the component mounts
    document.addEventListener('keydown', handleKeyDownDelete);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDownDelete);
    };
  }, []);

  useEffect(() => {
    handleListVendorComponents();
  }, [search]);

  useEffect(() => {
    setLoadingCallFlowDetails(true);
    GetCallFlow(params?.id)
      ?.then((response) => {
        setCallFlowDetails(response?.data);
        keyRef.current = {
          type: '',
          callFlowName: response?.data?.attributes?.name,
        };
      })
      .finally(() => {
        setLoadingCallFlowDetails(false);
      });
  }, [refreshCallFlowDetails]);

  useEffect(() => {
    if (callFlowDetails?.attributes?.flow?.actions?.length > 0) {
      setCustomNodes(callFlowDetails?.attributes?.flow?.actions);
    }

    if (callFlowDetails?.attributes?.flow?.connections?.length > 0) {
      setCustomEdges(callFlowDetails?.attributes?.flow?.connections);
    }
  }, [callFlowDetails]);

  useEffect(() => {
    setCategoriesList(voiceCategoryList?.data?.data);
  }, [voiceCategoryList?.data]);

  useEffect(() => {
    if (componentPlayingDetails?.parentType === 'hours') {
      if (componentPlayingDetails?.WorkingHoursType) {
        // Find the edges connected to the current node
        const resultEdge = getEdges(activeNodeId).filter(
          (edge) =>
            edge.targetType === componentPlayingDetails?.WorkingHoursType
        );

        // Find the next node connected to the activeNode
        setActiveNodeType(getNode(resultEdge[0]?.target)[0]?.type);
        addToActiveNode(getNode(resultEdge[0]?.target)[0]?.id);
        setActiveNodeDetails(getNode(resultEdge[0]?.target)[0]);
        setActiveNodeId(getNode(resultEdge[0]?.target)[0]?.id);
      }
    } else if (componentPlayingDetails?.parentType === 'greetify') {
      setActiveVoiceUrl(
        getVoiceURL(getNode(activeNodeId)[0]?.details?.voiceId)
      );
      if (
        componentPlayingDetails?.parentType === 'greetify' &&
        componentPlayingDetails?.voicePlayed
      ) {
        const nextNodeId = getEdges(activeNodeId)[0]?.target;
        setActiveNodeType(getNode(nextNodeId)[0]?.type);
        addToActiveNode(getNode(nextNodeId)[0]?.id);
        setActiveNodeDetails(getNode(nextNodeId)[0]);
        setActiveNodeId(nextNodeId);
      }
    } else if (componentPlayingDetails?.parentType === 'ivrMenu') {
      const resultEdge = getEdges(activeNodeId);
      if (componentPlayingDetails?.selectedKey) {
        // When user pressed a valid key
        const validEdges = resultEdge.filter(
          (edge) =>
            edge.sourceHandle.split(':')[0] ===
            String(componentPlayingDetails?.selectedKey)
        );

        // Find the next node connected to the activeNode
        setActiveNodeType(getNode(validEdges[0]?.target)[0]?.type);
        addToActiveNode(getNode(validEdges[0]?.target)[0]?.id);
        setActiveNodeDetails(getNode(validEdges[0]?.target)[0]);
        setActiveNodeId(getNode(validEdges[0]?.target)[0]?.id);
      } else if (
        componentPlayingDetails?.customerResponseType ===
        'customer-gives-wrong-input'
      ) {
        // When user pressed an invalid key
        // Find the edges connected to the current node
        const type = componentPlayingDetails?.customerResponseType;
        const validEdges = getEdges(activeNodeId).filter(
          (edge) => edge.sourceHandle.split(':')[0] === type
        );

        // Find the next node connected to the activeNode
        setActiveNodeType(getNode(validEdges[0]?.target)[0]?.type);
        addToActiveNode(getNode(validEdges[0]?.target)[0]?.id);
        setActiveNodeDetails(getNode(validEdges[0]?.target)[0]);
        setActiveNodeId(getNode(validEdges[0]?.target)[0]?.id);
      } else if (
        componentPlayingDetails?.customerResponseType ===
        'customer-not-responded'
      ) {
        // When user not responded
        // Find the edges connected to the current node
        const type = componentPlayingDetails?.customerResponseType;
        const validEdges = getEdges(activeNodeId).filter(
          (edge) => edge.sourceHandle.split(':')[0] === type
        );

        // Find the next node connected to the activeNode
        setActiveNodeType(getNode(validEdges[0]?.target)[0]?.type);
        addToActiveNode(getNode(validEdges[0]?.target)[0]?.id);
        setActiveNodeDetails(getNode(validEdges[0]?.target)[0]);
        setActiveNodeId(getNode(validEdges[0]?.target)[0]?.id);
      } else {
        setActiveNodeDetails(getNode(activeNodeId)[0]);
        setActiveVoiceUrl({
          initialVoice: getVoiceURL(
            getNode(activeNodeId)[0]?.details?.initialVoiceId
          ),
          noResponseVoice: getVoiceURL(
            getNode(activeNodeId)[0]?.details?.noResponseVoiceId
          ),
          wrongResponseVoice: getVoiceURL(
            getNode(activeNodeId)[0]?.details?.wrongResponseVoiceId
          ),
        });
      }
    } else if (componentPlayingDetails?.parentType === 'connect') {
      const resultEdge = getEdges(activeNodeId);

      if (componentPlayingDetails?.flowRedirectType) {
        const validEdges = resultEdge.filter((edge) => {
          const sourceHandle = edge.sourceHandle.split(':')[0];
          if (
            sourceHandle === String(componentPlayingDetails?.flowRedirectType)
          ) {
            return edge;
          }
          return null;
        });

        // Find the next node connected to the activeNode
        setActiveNodeType(getNode(validEdges[0]?.target)[0]?.type);
        addToActiveNode(getNode(validEdges[0]?.target)[0]?.id);
        setActiveNodeDetails(getNode(validEdges[0]?.target)[0]);
        setActiveNodeId(getNode(validEdges[0]?.target)[0]?.id);
      }
    } else if (componentPlayingDetails?.parentType === 'voice-mail') {
      if (componentPlayingDetails?.voicemailEnds) {
        const nextNodeId = getEdges(activeNodeId)[0]?.target;
        setActiveNodeType(getNode(nextNodeId)[0]?.type);
        addToActiveNode(getNode(nextNodeId)[0]?.id);
        setActiveNodeDetails(getNode(nextNodeId)[0]);
        setActiveNodeId(nextNodeId);
      } else {
        setActiveNodeDetails(getNode(activeNodeId)[0]);
        setActiveVoiceUrl({
          initialVoice: getVoiceURL(getNode(activeNodeId)[0]?.details?.voiceId),
        });
      }
    } else if (componentPlayingDetails?.parentType === 'email') {
      const nextNodeId = getEdges(activeNodeId)[0]?.target;
      setActiveNodeType(getNode(nextNodeId)[0]?.type);
      addToActiveNode(getNode(nextNodeId)[0]?.id);
      setActiveNodeDetails(getNode(nextNodeId)[0]);
      setActiveNodeId(nextNodeId);
    } else if (componentPlayingDetails?.parentType === 'caller-id') {
      if (
        componentPlayingDetails?.callerListID &&
        componentPlayingDetails?.connectionType === 'caller-in-list'
      ) {
        const validEdges = getEdges(activeNodeId).filter(
          (edge) =>
            edge.targetType ===
            `caller-list-${componentPlayingDetails?.callerListID}`
        );
        // Find the next node connected to the validEdges
        setActiveNodeType(getNode(validEdges[0]?.target)[0]?.type);
        addToActiveNode(getNode(validEdges[0]?.target)[0]?.id);
        setActiveNodeDetails(getNode(validEdges[0]?.target)[0]);
        setActiveNodeId(getNode(validEdges[0]?.target)[0]?.id);
      }
      if (componentPlayingDetails?.connectionType === 'caller-not-in-list') {
        const validEdges = getEdges(activeNodeId).filter(
          (edge) => edge.targetType === 'else'
        );
        // Find the next node connected to the validEdges
        setActiveNodeType(getNode(validEdges[0]?.target)[0]?.type);
        addToActiveNode(getNode(validEdges[0]?.target)[0]?.id);
        setActiveNodeDetails(getNode(validEdges[0]?.target)[0]);
        setActiveNodeId(getNode(validEdges[0]?.target)[0]?.id);
      }
    } else if (componentPlayingDetails?.parentType === 'callerList') {
      const nextNodeId = getEdges(activeNodeId)[0]?.target;
      setActiveNodeType(getNode(nextNodeId)[0]?.type);
      addToActiveNode(getNode(nextNodeId)[0]?.id);
      setActiveNodeDetails(getNode(nextNodeId)[0]);
      setActiveNodeId(nextNodeId);
    } else if (componentPlayingDetails?.parentType === 'shortcut') {
      if (componentPlayingDetails?.selectedKey) {
        const resultEdge = getEdges(activeNodeId);

        // When user pressed a valid key
        const validEdges = resultEdge.filter(
          (edge) =>
            edge.sourceHandle.split(':')[0] ===
            String(componentPlayingDetails?.selectedKey)
        );
        // Find the next node connected to the activeNode
        setActiveNodeType(getNode(validEdges[0]?.target)[0]?.type);
        addToActiveNode(getNode(validEdges[0]?.target)[0]?.id);
        setActiveNodeDetails(getNode(validEdges[0]?.target)[0]);
        setActiveNodeId(getNode(validEdges[0]?.target)[0]?.id);
      }
    } else if (componentPlayingDetails?.parentType === 'Passthru') {
      if (componentPlayingDetails?.type) {
        const resultEdge = getEdges(activeNodeId);
        // When user pressed a valid key
        const validEdges = resultEdge.filter(
          (edge) =>
            edge.sourceHandle.split(':')[0] ===
            String(componentPlayingDetails?.type)
        );
        // Find the next node connected to the activeNode
        setActiveNodeType(getNode(validEdges[0]?.target)[0]?.type);
        addToActiveNode(getNode(validEdges[0]?.target)[0]?.id);
        setActiveNodeDetails(getNode(validEdges[0]?.target)[0]);
        setActiveNodeId(getNode(validEdges[0]?.target)[0]?.id);
      }
    } else if (componentPlayingDetails?.parentType === 'SMS') {
      if (componentPlayingDetails?.type) {
        const resultEdge = getEdges(activeNodeId);
        // When user pressed a valid key
        const validEdges = resultEdge.filter(
          (edge) =>
            edge.sourceHandle.split(':')[0] ===
            String(componentPlayingDetails?.type)
        );
        // Find the next node connected to the activeNode
        setActiveNodeType(getNode(validEdges[0]?.target)[0]?.type);
        addToActiveNode(getNode(validEdges[0]?.target)[0]?.id);
        setActiveNodeDetails(getNode(validEdges[0]?.target)[0]);
        setActiveNodeId(getNode(validEdges[0]?.target)[0]?.id);
      }
    } else if (componentPlayingDetails?.parentType === 'sendSMS') {
      if (componentPlayingDetails?.type) {
        const resultEdge = getEdges(activeNodeId);

        // When user pressed a valid key
        const validEdges = resultEdge.filter(
          (edge) =>
            edge.sourceHandle.split(':')[0] ===
            String(componentPlayingDetails?.type)
        );
        // Find the next node connected to the activeNode
        setActiveNodeType(getNode(validEdges[0]?.target)[0]?.type);
        addToActiveNode(getNode(validEdges[0]?.target)[0]?.id);
        setActiveNodeDetails(getNode(validEdges[0]?.target)[0]);
        setActiveNodeId(getNode(validEdges[0]?.target)[0]?.id);
      }
    }
  }, [componentPlayingDetails]);

  useEffect(() => {
    ListAgents('telephony')?.then((response) => {
      setAgents(response?.data);
    });

    ListDepartments()?.then((response) => {
      setDepartments(response?.data);
    });

    ListAllApiLibrary()?.then((response) => {
      setApiLibraries(response?.data);
    });

    ListCallFlowsListWithoutPagination()?.then((response) => {
      setCallFlows(response?.data);
    });

    ListCallerList()?.then((response) => {
      setCallerList(response?.data);
      setCallerListArray(response?.data);
    });

    ListAllTemplates()?.then((response) => {
      setTemplates(response?.data);
    });
  }, []);

  useEffect(() => {
    if (availableIVRMenus?.length > 0) {
      setIVRSearchResult(availableIVRMenus);
    } else {
      setIVRSearchResult([]);
    }
  }, [availableIVRMenus]);

  useEffect(() => {
    if (selectedEdge?.id) {
      const arr = customEdges.map((edge) => {
        if (edge?.id === selectedEdge?.id) {
          return { ...edge, style: { stroke: '#333' } };
        }
        return { ...edge, style: { stroke: '' } };
      });

      setCustomEdges(arr);
    }
  }, [selectedEdge]);

  useEffect(() => {
    // console.clear();
    // console.log('customNodes : ', customNodes);
    // console.log('selectedNode : ', selectedNode);
  }, [customNodes, selectedNode]);

  return (
    <Layout
      title="comm voice"
      headerTitle="Call Flows"
      favIcon="/assets/favIcons/favicon-voice.ico"
      keyRef={keyRef}
      active="/app/comm-voice-admin/call-flow"
      sideNavIcon="/assets/comm-voice-logo.svg"
    >
      <audio ref={audioRef} controls style={{ display: 'none' }}>
        <track kind="captions" />
        <source src={selectedVoice?.url} type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
      <Header
        id={callFlowDetails?.id}
        name={callFlowDetails?.attributes?.name}
        isPublished={callFlowDetails?.attributes?.is_published}
        status={callFlowDetails?.attributes?.status}
        formik={formik}
        loading={loading}
        onClickPlay={() => {
          setRefreshCallFlowDetails(!refreshCallFlowDetails);
        }}
      >
        <div
          className="main-body-outer py-3"
          style={{ width: '100%', height: 'calc(100% - 50px)' }}
        >
          <div
            ref={divRef}
            className="main-body-inner main-body-inner-one main-body-react-flow bg-white rounded"
            style={
              loadingCallFlowDetails
                ? style1
                : { width: '100%', height: '100%' }
            }
          >
            <ReactFlowProvider>
              <ReactFlow
                nodes={customNodes}
                nodeTypes={customNodeTypes}
                edges={customEdges}
                onConnect={onConnect}
                onEdgeClick={onEdgeClick}
                // onNodeClick={onNodeClick}
                onNodeDragStop={onNodeDragStop}
              />
            </ReactFlowProvider>
          </div>
          <div
            ref={divRef}
            className="main-body-inner main-body-inner-one main-body-react-flow bg-white rounded d-flex align-items-center justify-content-center"
            style={
              loadingCallFlowDetails
                ? { width: '100%', height: '100%' }
                : { display: 'none' }
            }
          >
            <SpinningLoader />
          </div>
        </div>
      </Header>

      <ComponentSelectPopup
        isVisible={show?.isVisible && show?.type === 'select-components'}
        vendorComponents={vendorComponents}
        setSearch={setSearch}
        search={search}
        componentsloading={componentsloading}
        iVRSearchResult={iVRSearchResult}
        handleIVRSearch={handleIVRSearch}
        handleSelectIVR={handleSelectIVR}
      />
      <GreetifyModal
        isVisible={
          show?.isVisible &&
          (show?.type === 'Greetify' || show?.type === 'greetify')
        }
        onSelect={(data) => {
          handleAddComponent(data);
        }}
        onUpdate={(data) => {
          handleUpdateNode(data);
        }}
        onClose={() => {
          resetAudio();
          setSelectedVoice({
            id: 'select',
            parentType: '',
            url: '',
            isVoicePalying: false,
          });
        }}
        categoriesList={categoriesListSearchResult}
        voiceLibraryList={voiceLibraryList}
        setVoiceLibraryList={setVoiceLibraryList}
        active={active}
        setActive={setActive}
        loading={loading}
        togglePlay={togglePlay}
        selectedVoice={selectedVoice}
        onPause={onPause}
        resetAudio={resetAudio}
        isDataSubmiting={isDataSubmiting}
        allAvailableVoices={allAvailableVoices}
      />
      <IVRMenuModal
        isVisible={
          show?.isVisible &&
          (show?.type === 'IVR menu' || show?.type === 'ivr-menu')
        }
        onSelect={(data) => {
          handleAddComponent(data);
        }}
        onUpdate={(data) => {
          handleUpdateNode(data);
        }}
        onClose={() => {
          setSelectedVoice({
            id: 'select',
            parentType: '',
            url: '',
            isVoicePalying: false,
          });
        }}
        categoriesList={categoriesListSearchResult}
        voiceLibraryList={voiceLibraryList}
        setVoiceLibraryList={setVoiceLibraryList}
        active={active}
        setActive={setActive}
        loading={loading}
        setLoading={setLoading}
        togglePlay={togglePlay}
        selectedVoice={selectedVoice}
        onPause={onPause}
        resetAudio={resetAudio}
        isDataSubmiting={isDataSubmiting}
        allAvailableVoices={allAvailableVoices}
      />
      <ConnectModal
        isVisible={
          show?.isVisible &&
          (show?.type === 'Connect' || show?.type === 'connect')
        }
        onSelect={(data) => {
          handleAddComponent(data);
        }}
        onUpdate={(data) => {
          handleUpdateNode(data);
        }}
        categoriesList={categoriesListSearchResult}
        voiceLibraryList={voiceLibraryList}
        setVoiceLibraryList={setVoiceLibraryList}
        active={active}
        setActive={setActive}
        loading={loading}
        setLoading={setLoading}
        togglePlay={togglePlay}
        selectedVoice={selectedVoice}
        onPause={onPause}
        isDataSubmiting={isDataSubmiting}
        departments={departments}
        agents={agents}
        apiLibraries={apiLibraries}
        allAvailableVoices={allAvailableVoices}
      />
      <HoursModal
        isVisible={
          show?.isVisible && (show?.type === 'Hours' || show?.type === 'hours')
        }
        onSelect={(data) => {
          handleAddComponent(data);
        }}
        onUpdate={(data) => {
          handleUpdateNode(data);
        }}
        agentAvailabilities={agentAvailabilities?.data?.data}
        isDataSubmiting={isDataSubmiting}
      />
      <VoiceMailModal
        isVisible={
          show?.isVisible &&
          (show?.type === 'Voicemail' || show?.type === 'voicemail')
        }
        onSelect={(data) => {
          handleAddComponent(data);
        }}
        onUpdate={(data) => {
          handleUpdateNode(data);
        }}
        categoriesList={categoriesListSearchResult}
        voiceLibraryList={voiceLibraryList}
        setVoiceLibraryList={setVoiceLibraryList}
        active={active}
        setActive={setActive}
        loading={loading}
        setLoading={setLoading}
        togglePlay={togglePlay}
        selectedVoice={selectedVoice}
        onPause={onPause}
        departments={departments}
        agents={agents}
        isDataSubmiting={isDataSubmiting}
        allAvailableVoices={allAvailableVoices}
      />
      <EmailModal
        isVisible={
          show?.isVisible && (show?.type === 'Email' || show?.type === 'email')
        }
        onSelect={(data) => {
          handleAddComponent(data);
        }}
        onUpdate={(data) => {
          handleUpdateNode(data);
        }}
        departments={departments}
        isDataSubmiting={isDataSubmiting}
      />
      <CallerIdModal
        isVisible={
          show?.isVisible &&
          (show?.type === 'Caller ID' || show?.type === 'caller-id')
        }
        onSelect={(data) => {
          handleAddComponent(data);
        }}
        onUpdate={(data) => {
          handleUpdateNode(data);
        }}
        callerList={callerList}
        isDataSubmiting={isDataSubmiting}
      />
      <CallerListModal
        isVisible={
          show?.isVisible &&
          (show?.type === 'Caller List' || show?.type === 'caller-list')
        }
        onSelect={(data) => {
          handleAddComponent(data);
        }}
        onUpdate={(data) => {
          handleUpdateNode(data);
        }}
        callerList={callerList}
        isDataSubmiting={isDataSubmiting}
      />
      <ShortcutModal
        isVisible={
          show?.isVisible &&
          (show?.type === 'Shortcut' || show?.type === 'shortcut')
        }
        onSelect={(data) => {
          handleAddComponent(data);
        }}
        onUpdate={(data) => {
          handleUpdateNode(data);
        }}
        isDataSubmiting={isDataSubmiting}
      />

      <GetValueModalNew
        isVisible={
          show?.isVisible &&
          (show?.type === 'Get value' || show?.type === 'get-value')
        }
        onSelect={(data) => {
          handleAddComponent(data);
        }}
        onUpdate={(data) => {
          handleUpdateNode(data);
        }}
        categoriesList={categoriesListSearchResult}
        voiceLibraryList={voiceLibraryList}
        setVoiceLibraryList={setVoiceLibraryList}
        active={active}
        setActive={setActive}
        loading={loading}
        setLoading={setLoading}
        togglePlay={togglePlay}
        selectedVoice={selectedVoice}
        onPause={onPause}
        apiLibraries={apiLibraries}
        isDataSubmiting={isDataSubmiting}
        allAvailableVoices={allAvailableVoices}
      />
      <PassThruModal
        isVisible={
          show?.isVisible &&
          (show?.type === 'Passthru' || show?.type === 'passthru')
        }
        onSelect={(data) => {
          handleAddComponent(data);
        }}
        onUpdate={(data) => {
          handleUpdateNode(data);
        }}
        apiLibraries={apiLibraries}
        isDataSubmiting={isDataSubmiting}
      />
      <SMSModal
        isVisible={
          show?.isVisible && (show?.type === 'SMS' || show?.type === 'sms')
        }
        onSelect={(data) => {
          handleAddComponent(data);
        }}
        templates={templates}
        SMSSenderIDs={SMSSenderID}
        isDataSubmiting={isDataSubmiting}
      />
      <SendSMSModal
        isVisible={
          show?.isVisible &&
          (show?.type === 'Bulk SMS' || show?.type === 'send-sms')
        }
        onSelect={(data) => {
          handleAddComponent(data);
        }}
        SMSSenderIDs={SMSSenderID}
        departments={departments}
        agents={agents}
        callersList={callerList}
        apiLibraries={apiLibraries}
        isDataSubmiting={isDataSubmiting}
      />
      <QueueModal
        isVisible={
          show?.isVisible && (show?.type === 'Queue' || show?.type === 'queue')
        }
        onSelect={(data) => {
          handleAddComponent(data);
        }}
        categoriesList={categoriesListSearchResult}
        voiceLibraryList={voiceLibraryList}
        setVoiceLibraryList={setVoiceLibraryList}
        active={active}
        setActive={setActive}
        loading={loading}
        setLoading={setLoading}
        togglePlay={togglePlay}
        selectedVoice={selectedVoice}
        onPause={onPause}
        isDataSubmiting={isDataSubmiting}
      />
      <HangUpModal
        isVisible={
          show?.isVisible &&
          (show?.type === 'Hangup' || show?.type === 'hang-up')
        }
        onSelect={(data) => {
          handleAddComponent(data);
        }}
        onUpdate={(data) => {
          handleUpdateNode(data);
        }}
        categoriesList={categoriesListSearchResult}
        voiceLibraryList={voiceLibraryList}
        setVoiceLibraryList={setVoiceLibraryList}
        active={active}
        setActive={setActive}
        loading={loading}
        setLoading={setLoading}
        togglePlay={togglePlay}
        selectedVoice={selectedVoice}
        onPause={onPause}
        SMSSenderID={SMSSenderID}
        isDataSubmiting={isDataSubmiting}
      />
      <GoToFlowModal
        isVisible={
          show?.isVisible &&
          (show?.type === 'Go to flow' || show?.type === 'go-to-flow')
        }
        onSelect={(data) => {
          handleAddComponent(data);
        }}
        onUpdate={(data) => {
          handleUpdateNode(data);
        }}
        callFlows={callFlows}
        isDataSubmiting={isDataSubmiting}
      />
      <CallBackModal
        isVisible={
          show?.isVisible &&
          (show?.type === 'Callback' || show?.type === 'callBack')
        }
        onSelect={(data) => {
          handleAddComponent(data);
        }}
        onUpdate={(data) => {
          handleUpdateNode(data);
        }}
        categoriesList={categoriesListSearchResult}
        voiceLibraryList={voiceLibraryList}
        setVoiceLibraryList={setVoiceLibraryList}
        active={active}
        setActive={setActive}
        loading={loading}
        setLoading={setLoading}
        togglePlay={togglePlay}
        selectedVoice={selectedVoice}
        onPause={onPause}
        isDataSubmiting={isDataSubmiting}
        allAvailableVoices={allAvailableVoices}
      />
      <DeleteModal
        isVisible={show?.isVisible && show?.type === 'delete-node'}
        handleDelete={() => {
          handleDeleteComponent();
        }}
      />
      <PublishFlowModal
        isVisible={show?.isVisible && show?.type === 'publish-call-flow'}
        name={show?.name}
        onPublish={() => {
          handlePublishCallFlow();
        }}
        loading={loading}
        onClose={() => {
          setShow({
            isVisible: false,
            type: '',
          });
        }}
      />
      <UnpublishFlowModal
        isVisible={show?.isVisible && show?.type === 'unpublish-call-flow'}
        name={show?.name}
        onUnPublish={() => {
          handleUnPublishCallFlow();
        }}
        loading={loading}
        onClose={() => {
          setShow({
            isVisible: false,
            type: '',
          });
        }}
      />
      <TestFlowModal
        isVisible={show?.isVisible && show?.type === 'test-flow'}
        // isVisible
        name={show?.name}
        id={show?.id}
        onClose={() => {
          setShow({
            isVisible: false,
            type: '',
          });
        }}
        callFlowDetails={callFlowDetails}
        edges={customEdges}
        nodes={customNodes}
        isPublished={callFlowDetails?.attributes?.is_published}
      />

      <CommonModal
        isVisible={
          nodeSelectedForDelete?.isVisible &&
          nodeSelectedForDelete?.type === 'delete-node'
        }
        title="Delete Component"
        actionType="Delete "
        text=" the Component."
        label="To confirm this action please type “Delete”"
        btnLabel="Delete"
        onClose={() => {
          setNodeSelectedForDelete({ isVisible: false, nodeId: '', type: '' });
        }}
        actionKey="Delete"
        isProcessing={false}
        handleAction={() => {
          handleDeleteComponentNode();
        }}
      />

      <CommonModal
        isVisible={
          nodeSelectedForDelete?.isVisible &&
          nodeSelectedForDelete?.type === 'remove-connection'
        }
        title="Remove Connection"
        actionType="Remove "
        text=" the Connection."
        label="To confirm this action please type Remove"
        btnLabel="Remove"
        onClose={() => {
          setNodeSelectedForDelete({ isVisible: false, nodeId: '', type: '' });
        }}
        actionKey="Remove"
        isProcessing={isDataSubmiting}
        handleAction={() => {
          handleRemoveConnections();
        }}
      />

      {toastAction.type === 'success' ? (
        <ToastSuccess
          id="RenameWidgetMsg"
          onClose={() => {
            setToastAction({ isVisible: false, message: '' });
          }}
          showToast={toastAction?.isVisible}
        >
          <span>{toastAction?.message}</span>
        </ToastSuccess>
      ) : (
        <ToastError
          id="RenameWidgetMsg"
          onClose={() => {
            setToastAction({ isVisible: false, message: '' });
          }}
          showToast={toastAction?.isVisible}
          isSuccess={false}
        >
          <span>{toastAction?.message}</span>
        </ToastError>
      )}
    </Layout>
  );
}

export default Test;
