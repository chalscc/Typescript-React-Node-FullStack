--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.0

-- Started on 2024-01-26 16:25:01

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16648)
-- Name: marketers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.marketers (
    id integer NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.marketers OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16647)
-- Name: marketers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.marketers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.marketers_id_seq OWNER TO postgres;

--
-- TOC entry 4801 (class 0 OID 0)
-- Dependencies: 217
-- Name: marketers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.marketers_id_seq OWNED BY public.marketers.id;


--
-- TOC entry 216 (class 1259 OID 16639)
-- Name: operations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.operations (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    type character varying NOT NULL,
    amount integer NOT NULL,
    price numeric(5,2) NOT NULL,
    marketer_id integer,
    client_id integer
);


ALTER TABLE public.operations OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16638)
-- Name: operations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.operations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.operations_id_seq OWNER TO postgres;

--
-- TOC entry 4802 (class 0 OID 0)
-- Dependencies: 215
-- Name: operations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.operations_id_seq OWNED BY public.operations.id;


--
-- TOC entry 4640 (class 2604 OID 16651)
-- Name: marketers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marketers ALTER COLUMN id SET DEFAULT nextval('public.marketers_id_seq'::regclass);


--
-- TOC entry 4639 (class 2604 OID 16642)
-- Name: operations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.operations ALTER COLUMN id SET DEFAULT nextval('public.operations_id_seq'::regclass);


--
-- TOC entry 4795 (class 0 OID 16648)
-- Dependencies: 218
-- Data for Name: marketers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketers (id, name, created_at, updated_at) FROM stdin;
1	Naturgy	2024-01-26 15:26:11.395221	2024-01-26 15:26:11.395221
2	Endesa	2024-01-26 15:26:11.395221	2024-01-26 15:26:11.395221
3	Repsol	2024-01-26 15:26:11.395221	2024-01-26 15:26:11.395221
4	Iberdrola	2024-01-26 15:26:11.395221	2024-01-26 15:26:11.395221
5	Axpo	2024-01-26 15:26:11.395221	2024-01-26 15:26:11.395221
6	Cepsa	2024-01-26 15:26:11.395221	2024-01-26 15:26:11.395221
\.


--
-- TOC entry 4793 (class 0 OID 16639)
-- Dependencies: 216
-- Data for Name: operations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.operations (id, name, description, type, amount, price, marketer_id, client_id) FROM stdin;
3	Compra de Gasolina	Adquisición de gasolina para vehiculos.	venta	1000	2.50	3	4
4	Venta de Gas Natural	Suministro de gas natural	venta	5000	0.20	2	5
5	Compra de Propano	Adquisición de propano para uso industrial	compra	800	1.80	4	2
\.


--
-- TOC entry 4803 (class 0 OID 0)
-- Dependencies: 217
-- Name: marketers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marketers_id_seq', 6, true);


--
-- TOC entry 4804 (class 0 OID 0)
-- Dependencies: 215
-- Name: operations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.operations_id_seq', 5, true);


--
-- TOC entry 4646 (class 2606 OID 16657)
-- Name: marketers PK_1838a00b73955afbb005a496baa; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marketers
    ADD CONSTRAINT "PK_1838a00b73955afbb005a496baa" PRIMARY KEY (id);


--
-- TOC entry 4644 (class 2606 OID 16646)
-- Name: operations PK_7b62d84d6f9912b975987165856; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.operations
    ADD CONSTRAINT "PK_7b62d84d6f9912b975987165856" PRIMARY KEY (id);


--
-- TOC entry 4647 (class 2606 OID 16663)
-- Name: operations FK_a6b0718351bc24c57a9a64b70b1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.operations
    ADD CONSTRAINT "FK_a6b0718351bc24c57a9a64b70b1" FOREIGN KEY (client_id) REFERENCES public.marketers(id);


--
-- TOC entry 4648 (class 2606 OID 16658)
-- Name: operations FK_bc79d501d99c9b7857297bd8c49; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.operations
    ADD CONSTRAINT "FK_bc79d501d99c9b7857297bd8c49" FOREIGN KEY (marketer_id) REFERENCES public.marketers(id);


-- Completed on 2024-01-26 16:25:01

--
-- PostgreSQL database dump complete
--

